import ErrorText from "components/common/ErrorText"
import { Col, Form, Row } from "react-bootstrap"


const ContactForm = ({
    register, getValues,
    name, label,
    type, error, errors
}) => {
    return (
        <>
            <Row>
                <Form.Group as={Col} md={6} className="mb-3" >
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
                <Form.Group as={Col} md={6} className="mb-3" >
                <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("borough")}
                    />
                    <ErrorText name='borough' error={error} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md={6} className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register("email", { required: "This Feild Is required" })}
                    />
                    <ErrorText name='email' error={error} />
                    {errors.first_name && (
                        <Form.Text className="text-danger">
                            {errors.first_name.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3" >
                <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("phone")}
                    />
                    <ErrorText name='phone' error={error} />
                    {errors.first_name && (
                        <Form.Text className="text-danger">
                            {errors.first_name.message}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>
        </>
    )
}

export default ContactForm