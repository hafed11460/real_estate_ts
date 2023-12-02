import ErrorText from "components/common/ErrorText"
import { Col, Form } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import { BsCardImage, BsXSquare } from "react-icons/bs"
import { iconSize } from "value"
import { CreatePropertyFromData } from "./CreateProperty"
import { ChangeEvent, useState } from "react"

interface ImagesFormProps{
    imagesSRC:string[]
    handleRemoveImage:(idx:number) => void,
    handleFileChange:(e:ChangeEvent<HTMLInputElement>) => void,
}


const ImagesForm = () => {
    
    const { register, formState: { errors } } = useFormContext<CreatePropertyFromData>()
    const [imagesSRC, setImagesSRC] = useState<string[]>([])
    const [postImages, setPosteImages] = useState<File[]>([])

    const handleRemoveImage = (idx:number) => {
        setImagesSRC((imagesSrc) => {
            return imagesSrc.filter((img, index) => index != idx)
        });
        setPosteImages(postImages => {
            return postImages.filter((img, index) => index !== idx)
        });
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        console.log('handle file change ')
        const {files} = e.target
        const selectedFiles = files as FileList;
        
        const filesArray = new Array()
        let imagesSrc = new Array()
        for (let i = 0; i < selectedFiles.length; i++) {
            const img = selectedFiles[i]
            filesArray.push(img)
            const image_src = URL.createObjectURL(img)
            imagesSrc.push(image_src)
        }
        setPosteImages(filesArray)
        setImagesSRC(imagesSrc)
    }
    return (
        <>
            <div className="  ">
                <div className="p-2">
                    {/* <ErrorText name='images' error={error} /> */}
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