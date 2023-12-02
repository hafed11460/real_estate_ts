import { useFormContext } from "react-hook-form"
import { CreateTestFromData, InfoFormData } from "./CreateApp"
import { Row } from "react-bootstrap"
import InputTest from "./InputTest"

const InfoForm = ()=>{
    
    return(
        <>
            <Row>
                <InputTest type="text" name="title" label="Title" message="Titel Feild Is required"/>             
                <InputTest type="text" name="description" label="Description" message="Description Feild Is required"/>             
            </Row>
        
        </>
    )
}

export default InfoForm