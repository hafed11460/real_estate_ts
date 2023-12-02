import ErrorText from "components/common/ErrorText"
import { Spinner } from "components/common/Spinner"
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from "features/auth/authApi"
import { InputHTMLAttributes, useEffect, useState } from "react"
import { Button, Col, Collapse, Form } from "react-bootstrap"
import { FieldValue, FieldValues, UseFormGetValues, UseFormProps, UseFormRegister, useForm } from "react-hook-form"
import { FaEdit } from "react-icons/fa"

const SocilaInfo = () => {
    return (
        <>
            <div className="pt-2">
                <label className="form-label fw-bold mb-3">Socials</label>
            </div>
            <div className="d-flex align-items-center mb-3">
                <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-facebook text-body"></i></div>
                <input className="form-control" type="text" placeholder="Your Facebook account" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-linkedin text-body"></i></div>
                <input className="form-control" type="text" placeholder="Your LinkedIn account" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-twitter text-body"></i></div>
                <input className="form-control" type="text" placeholder="Your Twitter account" />
            </div>
            <div className="collapse" id="showMoreSocials">
                <div className="d-flex align-items-center mb-3">
                    <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-instagram text-body"></i></div>
                    <input className="form-control" type="text" placeholder="Your Instagram account" />
                </div>
                <div className="d-flex align-items-center mb-3">
                    <div className="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"><i className="fi-pinterest text-body"></i></div>
                    <input className="form-control" type="text" placeholder="Your Pinterest account" />
                </div>
            </div>
        </>
    )
}
type FormData =  {
    first_name:string,
    last_name:string,
    email:string,
}

interface CollapseEditProps{
    register: UseFormRegister<FormData>,
    getValues: UseFormGetValues<FormData>,
    label:string,
    type:string,
    name:"first_name" | "last_name" | "email",
    errors:any,
    error?:any,
}

const CollapseEdit = ({
    register, 
    getValues,
    name,
    label,
    type,
    error,
    errors
}:CollapseEditProps) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-bottom pb-3 mb-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="pe-2">
                    <label className="form-label fw-bold">{label}</label>
                    <div id={`${name}-value`}>
                        {getValues(name)}
                    </div>
                </div>
                <Button variant="white"
                    onClick={() => setOpen(!open)}
                    aria-controls={`${name}-text`}
                    aria-expanded={open}
                >
                    <FaEdit />
                </Button>
            </div>

            <Collapse in={open} className="mt-2">
                <Form.Group id={`${name}-text`}>
                    <Form.Control
                        type={type}
                        {...register(name, { required: "This Feild Is required" })}
                    ></Form.Control>
                    <ErrorText name={name} error={error} />
                    {errors[name] && (
                        <Form.Text className="text-danger">
                            {errors[name].message}
                        </Form.Text>
                    )}
                </Form.Group>
            </Collapse>

        </div>
    )
}

const AccountInfo = () => {
    const [updateUserInfo, { isSuccess, isLoading, isError, error }] = useUpdateUserInfoMutation()
    const { data: userInfo } = useGetUserInfoQuery({})

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        mode: 'onBlur',
        // errors: error
    })

    useEffect(() => {
        if (userInfo) {
            reset({
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
            })
        }
    }, [userInfo])


    const onSubmit = (values:FormData) => {
        updateUserInfo(values)
    }
    return (
        <Col lg={12} md={7} className="mb-5 ">
                <Form onSubmit={handleSubmit(onSubmit)}>

                        <CollapseEdit
                            register={register}
                            getValues={getValues}
                            errors={errors}
                            label="First Name"
                            name="first_name"
                            type="text" />

                        <CollapseEdit
                            register={register}
                            getValues={getValues}
                            errors={errors}
                            label="Last Name"
                            name='last_name'
                            type="text" />
                        <CollapseEdit
                            register={register}
                            getValues={getValues}
                            errors={errors}
                            label="Email"
                            name='email'
                            type="email" />
                        <Button
                            className="d-block w-100 mt-3"
                            variant="primary"
                            type="submit"
                        >
                            {isLoading && <Spinner/>
                            }
                            Save
                        </Button>
                </Form>            
        </Col>
    )
}

export default AccountInfo