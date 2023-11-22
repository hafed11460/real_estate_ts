import { Form } from "react-bootstrap"
import ErrorText from "./ErrorText"

const InputForm = ({
    register, getValues,
    name, label,
    type, error, errors }) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
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
    )
}

export default InputForm