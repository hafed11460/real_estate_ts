from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import * 
                        # (RegisterSerializer, LoginSerializer, TokenSerializer,
                        #   LogoutSerializer, EmailVerificationSerializer,SetNewPasswordSerializer,
                        #   ResetPasswordEmailRequestSerializer,UpdateProfileSerializer,UserInfoSerializer)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import views
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
import jwt
from django.conf import settings
from users.models import User
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from .utils import Util
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterAPIView(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_instance = serializer.save()
       

        token = RefreshToken.for_user(user_instance).access_token
        current_site = get_current_site(request).domain
        # relativeLink = reverse('email-verify')
        absurl = 'http://'+current_site+"/email-verify/"+"?token="+str(token)
        # # absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        email_body = 'Hi '+user_instance.first_name + \
            ' Use the link below to verify your email \n' + absurl
        data = {'email_body': email_body, 'to_email': user_instance.email,
                'email_subject': 'Verify your email'}
        
        print(data)

        # Util.send_email(data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


class RefrechTokenAPIView(GenericAPIView):
    serializer_class = TokenSerializer
    def post(self, request):
    
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


class LogoutAPIView(GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
    

class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    def get(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmail(GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    
    def post(self,request):
        email = request.data.get('email','')

        if not User.objects.filter(email=email).exists():
            return Response({'email':"This email does't exists."})
        
        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        # relativeLink = reverse('password-reset-confirm',kwargs={'uidb64':uidb64,'token':token})
        # absurl = 'http://'+current_site+ relativeLink
        current_site = get_current_site(request=request).domain       
        absurl = f'http://{current_site}/auth/password-reset-confirm/{uidb64}/{token}/'
        email_body = 'Hello \n   Use the link below to reset your passwor \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Reset your password '}

        Util.send_email(data)
        return Response({'success':'We have sent a link to reset your password '}, status=status.HTTP_200_OK)
     

class PasswordTokenCheckAPI(GenericAPIView):
    def get(self,request,uidb64, token):

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)


            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'error':'Token is not valid , please request a new one '},status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success':True, 'message':'Credentials valid ','uidb64':uidb64,'token':token},status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError:
            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'erro':'Token is not valid , please request a new one '},status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordAPIView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = None
        try:
            serializer = UserInfoSerializer(request.user, data=request.data)
        except User.userdetails.RelatedObjectDoesNotExist as e:
            serializer = UserInfoSerializer( data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get(self, request):
        try:
            serializer = UserInfoSerializer(request.user)
        except User.userdetails.RelatedObjectDoesNotExist as e:
            serializer = UpdateProfileSerializer(request.data)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UpdateUserAvatarAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserAvatarSerializer
    parser_classes = (MultiPartParser, FormParser)
    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)
       

class ChangeUserPasswordAPIView(generics.GenericAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        permission_classes = (IsAuthenticated,)       
        def patch(self, request):
            serializer = self.serializer_class(data=request.data,context={'request':request})
            serializer.is_valid(raise_exception=True)
            return Response({'success': True, 'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
        
        