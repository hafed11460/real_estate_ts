import { Row } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import InputProperty from "./InputProperty"


const ContactForm = () => {
    return (
        <>
            <Row>
                <InputProperty
                    size={6}
                    type="text"
                    name="first_name"
                    label="Firstname"
                    message="Firstname Feild Is required"
                />
                <InputProperty
                    size={6}
                    type="text"
                    name="last_name"
                    label="Lastname"
                    message="Firstname Feild Is required"
                />
            </Row>
            <Row>
            <InputProperty
                    size={6}
                    type="email"
                    name="email"
                    label="Email"
                    message="Email Feild Is required"
                />
                <InputProperty
                    size={6}
                    type="text"
                    name="phone"
                    label="Phone"
                    message="Phone Feild Is required"
                />
            </Row>
        </>
    )
}

export default ContactForm