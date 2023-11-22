import ErrorText from 'components/common/ErrorText';
import { Spinner } from 'components/common/Spinner';
import { usePasswordResetCompleteMutation } from 'features/auth/authApi';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type ResetPassword = {
    password:string,
    confirm_password:string,
    token:string,
    uidb64:string
}

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
  
  export const PasswordResetSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Your password has been reset, now please login with your new password.
            </p>
            <button onClick={() =>navigate('/login')}>Log in</button>
        </div>
    );
  }

export const PasswordResetForm = ({ token, uidb64 }:{token:string, uidb64:string}) => {
    const [passwordResetComplete, { data, isSuccess, isError, isLoading, error }] = usePasswordResetCompleteMutation()
    const initState:ResetPassword = {
        password: '',
        confirm_password: '',
        token: token,
        uidb64: uidb64
    }
    const [initialValues, setInitialValues] = useState(initState);
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        defaultValues: initialValues,
        // errors: error
    });

    const onSubmit = (values:ResetPassword) => {
        passwordResetComplete(values)
    };

    if (isError) return <PasswordResetFail />
    if (isSuccess) return <PasswordResetSuccess />
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Reset Password</h2>
                </Card.Header>
                <Card.Body className="px-4">
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>

                        <Row>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    {...register("password", { required: "This Feild Is required" })}
                                />
                                <ErrorText name='password' error={error} />
                                {errors.password && (
                                    <Form.Text className="text-danger">
                                        {errors.password.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    {...register("confirm_password", { required: "This Feild Is required" })}
                                />
                                <ErrorText name='confirm_password' error={error} />
                                {errors.confirm_password && (
                                    <Form.Text className="text-danger">
                                        {errors.confirm_password.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>

                        <Button
                            className="d-block w-100 mt-3"
                            variant="primary"
                            type="submit"
                        // disabled={!formData.role || !formData.first_name  || !formData.last_name || !formData.email || !formData.password || isLoading}
                        >
                            {isLoading && <Spinner
                                // as="span"
                                // animation="border"
                                // size="sm"
                                // role="status"
                                // aria-hidden="true"
                            />
                            }
                            Reset Password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default PasswordResetForm