
import { useContext, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";

import { useAddPropertyMutation } from "features/properties/propertyAPI";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaAngleLeft, FaAngleRight, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import InfoCreateForm from "./create/InfoCreateForm";
import PropertyMap from "./create/PropertyMap";
import ImagesForm from "./create/ImagesForm";
import ContactForm from "./create/ContactForm";
import DetailForm from "./create/DetailForm";
import { AgencyPropertyContext } from "./AgencyPropertyApp";



type CreatePropertyProps ={

}



const CreateProperty = (props:CreatePropertyProps) => {
    console.log('rundering CreateProperty')
    const [show, setShow] = useState(false);
    const [addProperty, { isLoading, isSuccess, isError, error }] = useAddPropertyMutation()
    const [imagesSRC, setImagesSRC] = useState([])
    const { position } = useContext(AgencyPropertyContext)
    const [step, setStep] = useState(1)

    const initState = {
        title: 'House In jijel',
        description: 'Lorem tincidunt lectus vitae id vulputate diam quam. Imperdiet non scelerisque turpis sed etiam ultrices. Blandit mollis dignissim egestas consectetur porttitor. Vulputate dolor pretium, dignissim eu augue sit ut convallis. Lectus est, magna urna feugiat sed ultricies sed in lacinia. Fusce potenti sit id pharetra vel ornare. Vestibulum sed tellus ullamcorper arcu',
        category: '',
        property_type: '',
        price: '1000',
        price_per: '',
        city: '',
        total_area: '150',
        amenities:[1,2,3],
        rooms: '10',
        latitude: '34',
        longitude: '5',
        images: null,
    }
    const [initialValues, setInitialValues] = useState(initState);

    const [postImages, setPosteImages] = useState([])

    const handleRemoveImage = (idx) => {

        setImagesSRC((imagesSrc) => {
            return imagesSrc.filter((img, index) => index != idx)
        });

        setPosteImages(postImages => {
            return postImages.filter((img, index) => index !== idx)
        });
    }

    const onSubmit = async (values) => {
        let newData = new FormData()
        newData.append('title', values.title)
        newData.append('description', values.description)
        newData.append('category', values.category)
        newData.append('property_type', values.property_type)
        newData.append('price', values.price)
        newData.append('price_per', values.price_per)
        newData.append('rooms', values.rooms)
        newData.append('city', values.city)
        newData.append('total_area', values.total_area)
        newData.append('amenities',JSON.stringify([1,2,3]))
        newData.append('latitude', position[0])
        newData.append('longitude', position[1])

        // for (let i = 0; i < values.amenities.length; i++) {
        //     newData.append('amenities[]', values.amenities[i])
        // }
        for (let i = 0; i < postImages.length; i++) {
            newData.append('images', postImages[i], postImages[i].name)
        }

        addProperty(newData).unwrap()
    };


    const handleFileChange = (e) => {
        console.log('handle file change ')
        const files = new Array()
        let imagesSrc = new Array()
        for (let i = 0; i < e.target.files.length; i++) {
            const img = e.target.files[i]
            console.log(img)
            files.push(img)
            const image_src = URL.createObjectURL(img)
            imagesSrc.push(image_src)
        }
        setPosteImages(files)
        setImagesSRC(imagesSrc)
    }

    const handelStep = (s) => {
        if (s > 0 && s < 6) setStep(s)
    }

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        // reValidateMode: "onChange",
        defaultValues: initialValues,
        errors: error
    });

    useEffect(() => {
        if (isSuccess) {
            setInitialValues(initState)
            setShow(false)
            toast.success('Property add Successfully')
        }
    }, [isSuccess])

    return (
        <div>
            <Button onClick={() => setShow(!show)}>
                <FaPlusCircle /> Property
            </Button>

            <Modal
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"

            >   

                <Modal.Body className=" mb-4 mt-3 px-5 pt-5">
                    <Form onSubmit={handleSubmit(onSubmit)} style={{ minHeight: "450px" }}>
                        {step == 1 && (
                            <InfoCreateForm register={register} errors={errors} watch={watch} requestError={error} />
                        )}
                        {step == 2 && (
                            <DetailForm register={register} errors={errors} watch={watch} requestError={error} />
                        )}

                        {step == 3 && (
                            <ImagesForm
                                handleFileChange={handleFileChange}
                                handleRemoveImage={handleRemoveImage}
                                register={register} errors={errors} watch={watch} requestError={error}
                                imagesSRC={imagesSRC}
                            />
                        )}
                        {step == 4 && (
                            <ContactForm
                                register={register} errors={errors} watch={watch} requestError={error}
                            />
                        )}
                        {step == 5 && (
                            <>
                                <PropertyMap register={register} errors={errors} watch={watch} error={error} />
                                <Button
                                    className="d-block w-100 mt-3"
                                    variant="primary"
                                    type="submit"
                                // disabled={!formData.title || isLoading}
                                >
                                    {isLoading && <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    }
                                    Post
                                </Button>
                            </>
                        )}

                    </Form>
                    <div className="d-flex justify-content-between mt-3 ">
                        <div>{step > 1 && <Button variant="light" onClick={() => handelStep(step - 1)}><FaAngleLeft size={20} />Prev</Button>}</div>
                        <div>{step < 5 && <Button variant="primary" onClick={() => handelStep(step + 1)}>Next<FaAngleRight size={20} /></Button>}</div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CreateProperty;