import ErrorText from "components/common/ErrorText"
import InputForm from "components/common/InputFrom"
import { useGetAmenitiesQuery } from "features/properties/propertyAPI"
import { Col, Form, Row } from "react-bootstrap"


const DetailForm = ({
    register, errors, watch, requestError: error, getValues
}) => {
    const { data } = useGetAmenitiesQuery()
    return (
        <>
            <Row >
                <Form.Group as={Col} md={6}  >
                    <Form.Label>Total area en m2 </Form.Label>
                    <Form.Control
                        type="text"
                        {...register("total_area", { required: "This Feild Is required" })}
                    />
                    <ErrorText name='total_area' error={error} />
                    {errors.total_area && (
                        <Form.Text className="text-danger">
                            {errors.total_area.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label>Rooms </Form.Label>
                    <Form.Control
                        {...register("rooms", { required: "This Feild Is required" })}
                    >                        
                    </Form.Control>
                    <ErrorText name='rooms' error={error} />
                        {errors.rooms && (
                            <Form.Text className="text-danger">
                                {errors.rooms.message}
                            </Form.Text>
                        )}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Row} className="mb-3 mt-3 d-flex flex-row justify-content-between">
                    <Form.Label>Amenities</Form.Label>
                    {data && data.map((item,id) => (
                        <Col key={id} sm={4} md={4}>
                            <Form.Check  {...register(item.name)} type="checkbox" label={item.name} />
                        </Col>
                    ))}
                </Form.Group>

            </Row>
        </>
    )
}

export default DetailForm