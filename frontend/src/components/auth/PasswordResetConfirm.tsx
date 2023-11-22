import React, { useEffect, useState } from "react";
import PasswordResetForm from "./PasswordResetFrom";
import { Spinner } from "components/common/Spinner";
import { usePasswordResetConfirmMutation } from "features/auth/authApi";
import { useMatch, useNavigate } from "react-router-dom";


export const PasswordResetFail = () => {
  const navigate = useNavigate();
  return (
      <div className="container">
          <h1>Uh oh...</h1>
          <p>
              Something went wrong while trying to reset your password.
          </p>
          <button onClick={() => navigate('/login')}>Back to Log in</button>
      </div>
  );
}

// export const PasswordResetSuccess = () => {
//   const navigate = useNavigate();
//   return (
//       <div className="content-container">
//           <h1>Success!</h1>
//           <p>
//               Your password has been reset, now please login with your new password.
//           </p>
//           <button onClick={() =>navigate('/login')}>Log in</button>
//       </div>
//   );
// }

const PasswordResetConfirm = () => {
  const match = useMatch('/auth/password-reset-confirm/:uid/:token/')
  const [passwordResetConfirm,    { data, isSuccess, isError, isLoading }  ] = usePasswordResetConfirmMutation()
  const [token,setToken] = useState<string>('')
  const [uid,setUid] = useState<string>('')
 
  useEffect(() => {
    if (match?.params.token && match?.params.uid){
      console.log('send data')
        setToken(match?.params.token)
        setUid( match?.params.uid)
        passwordResetConfirm({
          'uidb64': match?.params.uid,
          'token': match?.params.token
        })
    }else{
      console.error('token is not valid ')
    }
  }, [])

  if (isLoading) return <Spinner />
  if (isSuccess) return <PasswordResetForm token={token} uidb64={uid} />
  return <PasswordResetFail />
};

export default PasswordResetConfirm;
