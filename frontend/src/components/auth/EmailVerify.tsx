import { useEmailVerifyMutation } from "features/auth/authApi";
import { useQuery } from "hooks/useQuery";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const EmailVerificationFail = () => {
    const navigate = useNavigate()

    return (
        <div className="container">
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while trying to verify your email.
            </p>
            <button onClick={() => navigate('/register')}>Back to Sign-up</button>
        </div>
    );
}

export const EmailVerificationSuccess = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email, now you can use all the app's features.
            </p>
            <button onClick={() => navigate('/')}>Go to home page</button>
        </div>
    );
}


// EmailVerificationLandingPage
const EmailVerify = () => {
    let query = useQuery();
    const token = query.get("token")
    const [emailVerify, { data, isError, isLoading, isSuccess }] = useEmailVerifyMutation();

    useEffect(() => {
        if (token) {
            console.log(token)
            emailVerify({ token })
        }
    }, [])

    if (isLoading) return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
         )

    if (!isSuccess) return <EmailVerificationFail  />
    return <EmailVerificationSuccess />
}

export default EmailVerify