import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookSquare, FaGooglePlusG } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useEmailRestPasswordMutation, useLoginUserMutation } from "features/auth/authApi";
import { setLoginUser } from 'features/auth/authSlice';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ErrorText from "components/common/ErrorText";

type FormData = {
    email:string
}

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [emailRestPassword, { data, isSuccess, isLoading, isError, error }] = useEmailRestPasswordMutation()

    const initState = {
        email:'hafed11460@gmail.com'
    }

    const {
        register,
        handleSubmit,
        formState:{errors}
    
    } = useForm({
        mode:'onBlur',
        defaultValues:initState
    })
    const onSubmit = (values:FormData) => {
        // e.preventDefault();
        emailRestPassword(values)
    };

    // const handleFieldChange = e => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // };


    useEffect(() => {
        if (isSuccess) {
            if (data) {
                dispatch(setLoginUser(data))
                // navigate('/')
            }
        }
    })
    if(isSuccess){
        return <h5> Check Your email </h5>
    }
    return (
        <>
            <Card className="shadow  mb-5 bg-body rounded">
                <Card.Header>
                    <h2>Forgot Password</h2>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* {isError &&
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label className="text-danger">{error.data.errors}</Form.Label>
                            </Form.Group>
                        } */}
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
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {/* <Form.Label>Email address</Form.Label>
                            <Form.Select
                                value={formData.email}
                                name="email"
                                onChange={handleFieldChange}
                            >
                                <option value={'hafed11460@gmail.com'}>hafed11460@gmail.com</option>
                                <option value={'walid@gmail.com'}>walid@gmail.com</option>
                                <option value={'admin@gmail.com'}>admin@gmail.com</option>
                                <option value={'user@gmail.com'}>testUser</option>
                            </Form.Select> */}
                            {/* <Form.Control
                                value={formData.email}
                                name="email"
                                onChange={handleFieldChange}
                                type="email"
                            /> */}
                        </Form.Group>


                        
                        <Form.Group className="mb-3 d-flex flex-row-reverse justify-content-between">
                            <Link to="/login"> Login </Link>
                        </Form.Group>



                        <Button
                            className="d-block w-100 mt-3"
                            variant="primary"
                            type="submit"
                            // disabled={!formData.email || isLoading}
                        >
                            {isLoading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            }
                            Send
                        </Button>
                        {/* <Form.Group className="mb-3 d-flex flex-row-reverse justify-content-between">
                            <Link to="/login"> Login </Link>
                        </Form.Group> */}

                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default ForgotPassword;