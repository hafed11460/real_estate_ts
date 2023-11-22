import ErrorText from "components/common/ErrorText"
import { Col, Form, Row } from "react-bootstrap"

const InfoEditForm = ({ register, errors, watch, requestError: error }) => {
    return (
        <>
            <Row>
                <Form.Group as={Col} md={6} className="mb-3" >
                    <Form.Control
                        placeholder="Title"
                        type="text"
                        {...register("title", { required: "This Feild Is required" })}
                    />
                    <ErrorText name='title' error={error} />
                    {errors.title && (
                        <Form.Text className="text-danger">
                            {errors.title.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3" >
                    <Form.Control
                        placeholder="Borough"
                        type="text"
                        {...register("borough")}
                    />
                    <ErrorText name='borough' error={error} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md={6} className="mb-3" >
                    <Form.Control
                        placeholder="Price"
                        type="number"
                        {...register("price", { required: "This Feild Is required" })}
                    />
                    <ErrorText name='price' error={error} />
                    {errors.price && (
                        <Form.Text className="text-danger">
                            {errors.price.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3" >
                    <Form.Control
                        placeholder="Area"
                        type="text"
                        {...register("area")}
                    />
                    <ErrorText name='area' error={error} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md={6} className="mb-3" >
                    <Form.Control
                        placeholder="Property type"
                        {...register("property_type")}
                        type="text"
                    />
                    <ErrorText name='property_type' error={error} />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-2" >
                    <Form.Control
                        placeholder="Property status"
                        type="text"
                        {...register("property_status")}
                    />
                    <ErrorText name='property_status' error={error} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md={6} className="mb-2" >
                    <Form.Control
                        placeholder="Rental frequency"
                        type="text"
                        {...register("rental_frequency")}
                    />
                    <ErrorText name='rental_frequency' error={error} />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-2" >
                    <Form.Control
                        placeholder="Rooms"
                        type="text"
                        {...register("rooms")}
                    />
                    <ErrorText name='rooms' error={error} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-3 mt-3 d-flex flex-row justify-content-between">
                    <Form.Check  {...register("furnished")} type="checkbox" label="furnished" />
                    <Form.Check  {...register("pool")} type="checkbox" label="pool" />
                    <Form.Check  {...register("elevator")} type="checkbox" label="elevator" />
                    <Form.Check  {...register("cctv")} type="checkbox" label="cctv" />
                    <Form.Check  {...register("parking")} type="checkbox" label="parking" />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" >
                <Form.Control
                    placeholder="Description"
                    as="textarea" rows={3}
                    {...register("description")}
                />
            </Form.Group></>
    )
}
export default InfoEditForm