import ErrorText from "components/common/ErrorText"
import { Col, Form } from "react-bootstrap"
import { BsCardImage, BsXSquare } from "react-icons/bs"
import { iconSize } from "value"

const ImagesForm = ({ register, errors, watch,requestError:error,imagesSRC, handleRemoveImage,handleFileChange }) => {
    
     
    return (
        <>
            <div className="  ">
                <div className="p-2">
                    <ErrorText name='images' error={error} />
                    {errors.images && (
                        <Form.Text className="text-danger">
                            {errors.images.message}
                        </Form.Text>
                    )}
                </div>
                <div className="d-flex flex-column align-items-center pt-2 border bg-light shadow-sm rounded">
                    <div>
                        <BsCardImage className="text-success" size={iconSize} /> Images
                    </div>
                    <Form.Group className="mb-3 position-absolute bg-transparent opacity-0 ">
                        <Form.Control
                            name='images'
                            accept="image/*"
                            {...register("images", { required: "Property must have Images",onChange:handleFileChange })}
                            // onChange={handleFileChange}
                            type="file" multiple
                        />


                    </Form.Group>
                    <h6>
                        Add Photos
                    </h6>

                    <div className=" border-top">
                        {
                            imagesSRC.map((img, idx) => (
                                <Col xs={2} sm={3} md={4} key={idx}
                                    className="p-0 position-relative border m-1 float-start">
                                    <BsXSquare onClick={() => handleRemoveImage(idx)}
                                        color="dark" size={iconSize}
                                        className=" bg-white  position-absolute top-0 end-0"
                                    />
                                    <img width="100%" src={img} />
                                </Col>
                            ))
                        }
                    </div>
                </div>

            </div>

        </>
    )
}

export default ImagesForm