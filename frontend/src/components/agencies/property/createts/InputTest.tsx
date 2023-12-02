import { Form } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import { CreateTestFromData } from "./CreateApp"
import { memo, useEffect } from "react"

interface InputTestProps{
    label:string,
    type:string,
    name: string ;
    message:string
}
const InputTest = memo(({label,type,name,message}:InputTestProps)=>{
    const {register,formState:{errors}} = useFormContext<CreateTestFromData>()
    // useEffect(()=>{
    //     console.log(errors)
    // },[errors])
    return(
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                {...register(name, { required: message })}
            ></Form.Control>
            {/* <ErrorText name={name} error={error} /> */}
            {errors[name] && (
                <Form.Text className="text-danger">
                    {errors[name]?.message}
                </Form.Text>
            )}
        </Form.Group>
    )
})

export default InputTest