import AlertMessage from "components/common/AlertMessag"
import ErrorText from "components/common/ErrorText"
import InputForm from "components/common/InputFrom"
import { Spinner } from "components/common/Spinner"
import { useUpdateUserPasswordMutation } from "features/auth/authApi"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const AccountSecurity = () => {
    const [updateUserPassword, { isSuccess, isLoading, isError, error }] = useUpdateUserPasswordMutation()
    const initState = {
        'old_password': 'Azerty@123',
        'new_password': 'Azerty@123',
        'confirm_password': 'Azerty@123'
    }
    const [initialState, setInialState] = useState(initState)
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        defaultValues: initialState,
        errors: error
    })
    const onSubmit = (values) => {
        updateUserPassword(values)
    }
    return (
        <>
            <Col lg={12} md={7} >
                <h1 className="h2">Password &amp; Security</h1>
                <p className="pt-1">Manage your password settings and secure your account.</p>
                <h2 className="h5">Password</h2>
                {
                    isSuccess && 
                    <AlertMessage content={'Password Updated Succesfuly'}/>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="row align-items-end mb-2">                        
                        <Col sm={6} >
                            <InputForm as={Col} sm={6}
                                register={register}
                                getValues={getValues}
                                errors={errors}
                                error={error}
                                label="Current password"
                                name='old_password'
                                type="password" />
                        </Col>

                        <Col sm={6} >
                            <Link to={'/forgot-password/'}>Forgot password?</Link>                            
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm={12}>
                            <InputForm as={Col} sm={6}
                                register={register}
                                getValues={getValues}
                                errors={errors}
                                error={error}
                                label="New password"
                                name='new_password'
                                type="password" />
                        </Col>
                        <Col sm={12}>
                            <InputForm as={Col} sm={6}
                                register={register}
                                getValues={getValues}
                                errors={errors}
                                error={error}
                                label="Confirm password"
                                name='confirm_password'
                                type="password" />
                        </Col>
                    </Row>
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
                        Save
                    </Button>
                </Form>
            </Col>
        </>
    )
}

export default AccountSecurity