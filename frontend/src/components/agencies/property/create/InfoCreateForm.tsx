import ErrorText from "components/common/ErrorText"
import InputForm from "components/common/InputFrom"
import { Col, Form, Row } from "react-bootstrap"
import { price_type, property_type } from "types/properties"


const InfoCreateForm = ({ register, errors, watch, requestError: error, getValues }) => {
    return (
        <>
            <Row>
                <InputForm as={Col} sm={6} className="mb-3"
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    error={error}
                    label="Title"
                    name='title'
                    type="text" />
            </Row>
            <Row className="mt-3">
                <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label>Category </Form.Label>
                    <Form.Select
                        {...register("category", { required: "This Feild Is required" })}
                    >
                        <option value={'Sale'}>Fro sale</option>
                        <option value={'Rent'}>For rent</option>
                    </Form.Select>
                    <ErrorText name='category' error={error} />
                    {errors.category && (
                        <Form.Text className="text-danger">
                            {errors.category.message}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label>Property Type </Form.Label>
                    <Form.Select
                        {...register("property_type", { required: "This Feild Is required" })}
                    >
                        {property_type.map((p,id) => (
                            <option key={id} value={p}> {p}</option>
                        ))}                       
                    </Form.Select>
                    <ErrorText name='property_type' error={error} />
                    {errors.property_type && (
                        <Form.Text className="text-danger">
                            {errors.property_type.message}
                        </Form.Text>
                    )}
                </Form.Group>

            </Row>
            <Row >
                <Form.Group as={Col} md={6}  >
                    <Form.Label>Price </Form.Label>
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
                <Form.Group as={Col} md={6} className="mb-3">
                    <Form.Label>Time </Form.Label>
                    <Form.Select
                        {...register("price_per", { required: "This Feild Is required" })}
                    >
                        {price_type.map((p) => (
                            <option value={p}> {p}</option>
                        ))}
                    </Form.Select>
                    <ErrorText name='price_per' error={error} />
                    {errors.price_per && (
                        <Form.Text className="text-danger">
                            {errors.price_per.message}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder="Description Your Property"
                    as="textarea" rows={5}
                    {...register("description")}
                />
            </Form.Group>
            <Row>

            </Row>

        </>
    )
}
export default InfoCreateForm