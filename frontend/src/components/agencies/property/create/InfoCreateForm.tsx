import { Row } from "react-bootstrap"
import { price_type, property_type } from "types/properties"
import { useCreatePropertyForm } from "./CreateProperty"
import InputProperty from "./InputProperty"


const InfoCreateForm = () => {
    return (
        <>
            <Row>
                <InputProperty
                    size={12}
                    type="text"
                    name="title"
                    label="Title"
                    message="Tilte Feild Is required"
                />
            </Row>
            <Row className="mt-3">
                <InputProperty
                    size={6}
                    type="select"
                    name="category"
                    label="Category"
                    message="Tilte Feild Is required"
                    options={['Sale', 'Rent']}
                />

                <InputProperty
                    size={6}
                    type="select"
                    name="property_type"
                    label="Property Type"
                    message="Tilte Feild Is required"
                    options={property_type}
                />
            </Row>
            {/* <Row >
                <InputProperty
                    size={6}
                    type="number"
                    name="price"
                    label="Price"
                    message="Price Feild Is required"
                />

                <InputProperty
                    size={6}
                    type="select"
                    name="price_per"
                    label="Time"
                    message="Tilte Feild Is required"
                    options={price_type}
                />
            </Row>
            <InputProperty
                type="textarea"
                name="description"
                label="Description"
                message="Description Feild Is required"
            /> */}
        </>
    )
}
export default InfoCreateForm