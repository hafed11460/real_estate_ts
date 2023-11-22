import ErrorText from "components/common/ErrorText";
import { useRegisterUserMutation } from "features/auth/authApi";
import { useState } from "react";
import { Alert, Button, ButtonGroup, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

type FormDataType = {
    email: string,
    role: string,
    first_name: string,
    last_name: string,
    password: string,
    confirm_password: string,
    remember: false

}
const SucceseRegister = ({ email }: { email: string }) => {
    return (
        <div>
            <div className="mb-4">
                <div className="d-flex justify-content-center ">
                    <FaCheckCircle size={70} className="text-success" />
                </div>
                <div className="d-flex justify-content-center  mt-3">
                    <h4>Registration Success</h4>
                </div>
            </div>
            <Alert variant="success">
                <p> Thank you. We have sent you email to {email}.</p>
                <p>Please click the link in that message to activate your account</p>
            </Alert>
            <div className="d-flex justify-content-center ">
                {/* <Button as={Link} to={'/login/'} variant="outline-secondary">Login</Button> */}
            </div>
        </div>
    )
}
const Register = () => {
    const [validated, setValidated] = useState(false)

    const [registerUser, { data, isSuccess, isLoading, isError, error }] = useRegisterUserMutation()

    const initState: FormDataType = {
        role: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        remember: false
    }
    const [formData, setFormData] = useState<FormDataType>({
        role: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        remember: false
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataType>({
        mode: 'onBlur',
        defaultValues: initState
    })

    const onSubmit = (values: FormDataType) => {
        registerUser(values)
    };

    // useEffect(() => {
    //     if (isSuccess) {
    //         if (data) {
    //             // dispatch(setLoginUser(data))
    //             // navigate('/login/')
    //         }
    //     }
    // }, [isSuccess])
    if (isSuccess) return (<SucceseRegister email={formData.email} />)
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Register</h2>
                </Card.Header>
                <Card.Body className="px-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="my-3">
                            <ButtonGroup className="w-100">
                                <Form.Control
                                    type="radio"
                                    value='CUSTOMER'
                                    {...register("role", { required: "This Feild Is required" })}
                                    className='btn-check ' id="customer_radio" autoComplete="off" />
                                <Form.Label className="btn btn-outline-success    me-2"
                                    htmlFor="customer_radio">I'm a Customer </Form.Label>

                                <Form.Control
                                    type="radio" value='VENDOR'
                                    {...register("role", { required: "This Feild Is required" })}
                                    className='btn-check' id="vendor_radio" autoComplete="off" />
                                <Form.Label className="btn btn-outline-success"
                                    htmlFor="vendor_radio">I'm a Vendor</Form.Label>
                            </ButtonGroup>
                            <ErrorText name='email' error={error} />
                            {errors.role && (
                                <Form.Text className="text-danger">
                                    {errors.role.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("first_name", { required: "This Feild Is required" })}
                                />
                                <ErrorText name='first_name' error={error} />
                                {errors.first_name && (
                                    <Form.Text className="text-danger">
                                        {errors.first_name.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group as={Col} md={6} className="mb-2" >
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("last_name", { required: "This Feild Is required" })}
                                />
                                <ErrorText name='last_name' error={error} />
                                {errors.last_name && (
                                    <Form.Text className="text-danger">
                                        {errors.last_name.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-2" >
                            <Form.Label>Email address</Form.Label>
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

                        <Row>
                            <Form.Group className="mb-2 d-flex flex-row justify-content-between">
                                <Form.Check type="checkbox" label="I accept the terms and privacy policy" />
                            </Form.Group>
                            <Form.Group className="mb-2 d-flex flex-row justify-content-between">
                                <Link to="/login">Already User? Login</Link>
                            </Form.Group>
                        </Row>

                        <Button
                            className="d-block w-100 mt-3"
                            variant="primary"
                            type="submit"
                        // disabled={!formData.role || !formData.first_name || !formData.last_name || !formData.email || !formData.password || isLoading}
                        >
                            {isLoading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            }
                            Register
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

export default Register;