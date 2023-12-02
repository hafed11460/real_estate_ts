import { Col, Form, Row } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import { ContactFormData, CreateTestFromData } from "./CreateApp"
import InputTest from "./InputTest"



const ContactForm = ()=>{
    
    return(
        <>
            <Row>
                <InputTest type="text" name="first_name" label="First Name" message="Firstname Feild Is required"/>             
                <InputTest type="text" name="last_name" label="Last Name" message="Lastname Feild Is required"/>             
            </Row>
        
        </>
    )
}

export default ContactForm