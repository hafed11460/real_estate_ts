import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare, FaGooglePlusG } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "features/auth/authApi";
import { setLoginUser } from 'features/auth/authSlice';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ErrorText from "components/common/ErrorText";

type FormData = {
    email:string,
    password:string,
    remember:boolean
}

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginUser, { data, isSuccess, isLoading, isError, error }] = useLoginUserMutation()
    const initState = {
        email: 'vendor@gmail.com',
        password: 'Azerty@123',
        remember: false
    }
    const [initialValues, setInitialValues] = useState(initState);
    

    const {
        register,
        handleSubmit,       
        formState: { errors }
    } = useForm<FormData>({
        mode: 'onBlur',
        defaultValues:initialValues,
        // errors: error
    })

    const onSubmit = (values:FormData) => {
        loginUser(values)
    };

    
    useEffect(() => {
        if (isSuccess) {
            if (data) {
                dispatch(setLoginUser(data))
                navigate('/')
            }
        }
    }, [isSuccess])
  
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Login</h2>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {isError &&
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <ErrorText name='error' error={error} />
                            </Form.Group>
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            {/* <Form.Select
                                value={formData.email}
                                name="email"
                                onChange={handleFieldChange}
                            >
                                <option value={'vendor@gmail.com'}>vendor@gmail.com</option>
                                <option value={'customer@gmail.com'}>customer@gmail.com</option>
                                <option value={'hafed@gmail.com'}>hafed@gmail.com</option>
                                <option value={'hafed11460@gmail.com'}>hafed11460@gmail.com</option>
                                <option value={'admin@gmail.com'}>admin@gmail.com</option>
                            </Form.Select> */}


                            <Form.Control
                                type="email"
                                {...register("email", { required: "This Feild Is required" })}
                            />
                            <ErrorText name='email' error={error} />
                            {errors.email && (
                                <Form.Text className="text-danger">
                                    {errors.email.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" >
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

                        <Form.Group className="mb-3 d-flex flex-row justify-content-between">
                            <Form.Check type="checkbox" label="Check me out" />
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex flex-row-reverse justify-content-between">
                            <Link to="/register"> New User? Create account </Link>
                        </Form.Group>

                        <Button
                            className="d-block w-100 mt-3"
                            variant="primary"
                            type="submit"                            
                        >
                            {isLoading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            }
                            Log in
                        </Button>
                        {/* <div className="position-relative mt-4">
                            <hr className="bg-300" />
                            <div className="text-center">or log in with</div>
                        </div>
                        <div className="row g-2 mt-2">
                            <div className="col-sm-6">
                                <Button as="a" variant="outline-danger" className="d-block w-100">
                                    <FaGooglePlusG /> google
                                </Button>
                            </div>
                            <div className="col-sm-6">
                                <Button variant="outline-primary" className="d-block w-100">
                                    <FaFacebookSquare /> facebook
                                </Button>
                            </div>
                        </div> */}
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Login;