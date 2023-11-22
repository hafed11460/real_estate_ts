import ErrorText from "components/common/ErrorText";
import { useGetAgencyInfoMutation, useUpdateAgencyInfoMutation } from "features/agencies/agencyAPI";
import { useEffect, useRef } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const AgencySettings = () => {
    const effectRun = useRef(false)
    const [getAgencyInfo,    { data: agency, }] = useGetAgencyInfoMutation()

    const [updateAgencyInfo, { data, isSuccess:isUpdated,error,isLoading }] = useUpdateAgencyInfoMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        errors: error
    })
    useEffect(() => {
        if(effectRun.current === false){
            getAgencyInfo()
        }
        return ()=>{
            effectRun.current = true
        }
    }, [])

    
    useEffect(() => {
        if (agency)
            reset({
                name: agency.name,
                phone: agency.phone,
                bio: agency.bio,
            })
    }, [agency])

    const onSubmit = (values) => {
        updateAgencyInfo(values)
    };
    // if (isLoading) return <div>Loading...</div>
    // if (!agency) return <div>Missing post!</div>
    return (
        <>
            <Card className=" pt-3 mb-5 bg-body rounded-0 border-0">
                <Card.Body className="px-4">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Form.Group as={Col} md={6} className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('name',{ required: "This Feild Is required" })}
                                />
                                <ErrorText name='name' error={error} />
                                {errors.name && (
                                    <Form.Text className="text-danger">
                                        {errors.name.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group as={Col} md={6} className="mb-3" >
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('phone',{ required: "This Feild Is required" })}
                                />
                                <ErrorText name='phone' error={error} />
                                {errors.phone && (
                                    <Form.Text className="text-danger">
                                        {errors.phone.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                {...register('bio')}
                                as="textarea" rows={3}
                            />
                            <ErrorText name='bio' error={error} />
                            {errors.bio && (
                                <Form.Text className="text-danger">
                                    {errors.bio.message}
                                </Form.Text>
                            )}
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
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default AgencySettings;