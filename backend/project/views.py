
from django.views.generic.base import View
from django.shortcuts import render

class AboutUs(View):
  def get(self, request, *args, **kwargs):
        return render(request, "index.html")
