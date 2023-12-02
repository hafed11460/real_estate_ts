import { FormProvider, useForm } from "react-hook-form";
import InfoForm from "./InfoForm";
import ContactForm from "./ContactForm";
import { Button, Container, Form } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useCallback, useState } from "react";


export interface ContactFormData {
    first_name: string,
    last_name: string,
}
export interface InfoFormData {
    
    title: string
    description: string,

}
export interface CreateTestFromData extends ContactFormData,InfoFormData {    
    [key: string]: string
} 

function useCreateTestForm() {
    const methods = useForm<CreateTestFromData>({
        defaultValues:{
            first_name:'hafed',
            last_name:'mahfoud',
            title:'this is a test for form validate'
        }
    })

    const onSubmit = useCallback((values: CreateTestFromData) => {
        console.log('values', values)
    }, [])

    return {
        ...methods,
        onSubmit: methods.handleSubmit(onSubmit),
        handleSubmit: methods.handleSubmit,

    }
}


const CreateApp = () => {
    const [step, setStep] = useState(1)
    const lastStep = 2
    const { register, handleSubmit, onSubmit, ...methods } = useCreateTestForm()
    

    const onSubmitData = (values:CreateTestFromData) => {
        setStep(step + 1)
        
        if(step == lastStep){
            console.log(values)
        }
    }
    const handelStep = (s: number) => {
        if (s > 0 && s < 3) setStep(s)
    }


    return (
        <Container>
            <FormProvider {...methods} register={register} >
                <Form onSubmit={handleSubmit(onSubmitData)} style={{ minHeight: "450px" }} >
                    {step == 1 && (
                        <ContactForm />
                    )}
                    {step == 2 && (
                        <InfoForm />
                    )}
                    {/* {step == 2 && ( */}
                    {/* <Button
                        className="d-block w-100 mt-3"
                        variant="primary"
                        type="submit"
                    >
                        Save
                    </Button> */}
                    {/* )} */}
                    <div className="d-flex justify-content-between mt-3 ">
                        <div>{step > 1 && <Button variant="light" onClick={() => handelStep(step - 1)}><FaAngleLeft size={20} />Prev</Button>}</div>
                        <div>
                             <Button variant="primary" type="submit">
                                {step < 2 ?
                                    <>
                                        Next<FaAngleRight size={20} />
                                    </> :
                                    <>
                                        save<FaAngleRight size={20} />
                                    </>

                                }
                            </Button>
                            
                        </div>
                    </div>
                </Form>
            </FormProvider>
        </Container>
    )
}

export default CreateApp