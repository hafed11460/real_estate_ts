import ErrorText from "components/common/ErrorText"
import { useGetAmenitiesQuery } from "features/properties/propertyAPI"
import { Col, Form, Row } from "react-bootstrap"
import { useCreatePropertyForm } from "./CreateProperty"
import InputProperty from "./InputProperty"
import { IAmenity } from "types/properties"


const DetailForm = () => {
    const { register } = useCreatePropertyForm()
    const { data } = useGetAmenitiesQuery({})
    return (
        <>
            <Row >
                <InputProperty size={6}
                    type="text"
                    name="total_area"
                    label="Total area en m2"
                    message="Tilte Feild Is required"
                />
                <InputProperty size={6}
                    type="text"
                    name="rooms"
                    label="Rooms"
                    message="Tilte Feild Is required"
                />
            </Row>
            <Row>
                <Form.Group as={Row} className="mb-3 mt-3 d-flex flex-row justify-content-between">
                    <Form.Label>Amenities</Form.Label>
                    {data && data.map((item:IAmenity) => (
                        <Col key={item.id} sm={4} md={4}>
                            <Form.Check  {...register(item.name)} type="checkbox" label={item.name} />
                        </Col>
                    ))}
                </Form.Group>

            </Row>
        </>
    )
}

export default DetailForm