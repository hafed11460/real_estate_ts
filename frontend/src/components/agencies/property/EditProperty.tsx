
import { memo, useContext, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import {
    BsCardImage,
    BsXSquare
} from "react-icons/bs";

import ErrorText from "components/common/ErrorText";
import { useGetPropertyMutation, useUpdatePropertyMutation } from "features/properties/propertyAPI";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { iconSize } from "value";
import { AgencyPropertyContext } from "./AgencyPropertyApp";
import InfoEditForm from "./edit/InfoEditForm";
import ImagesEditForm from "./edit/ImagesEditForm";
import PropertyMap from "./create/PropertyMap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const EditProperty = (props) => {
    console.log('rundering EditProperty')
    const { position, setPosition } = useContext(AgencyPropertyContext)
    const [step, setStep] = useState(1)

    const [getProperty, { data: post, isSuccess: success }] = useGetPropertyMutation()
    const [updateProperty, { isLoading, isSuccess, isError, error }] = useUpdatePropertyMutation()

    const [postImages, setPosteImages] = useState()
    const [imagesSRC, setImagesSRC] = useState()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        // mode: "onTouched",
        reValidateMode: "onSubmit",
        // defaultValues: initialValues,
        errors: error
    });


    useEffect(() => {
        if (post) {
            reset({
                id: post.id,
                title: post.title,
                description: post.description ? post.description : '',
                area: post.area ? post.area : '',
                borough: post.borough ? post.borough : '',
                property_type: post.property_type ? post.property_type : '',
                property_status: post.property_status ? post.property_status : '',
                price: post.price ? post.price : '',
                rental_frequency: post.rental_frequency ? post.rental_frequency : '',
                rooms: post.rooms ? post.rooms : '',
                furnished: post.furnished,
                pool: post.pool,
                elevator: post.elevator,
                cctv: post.cctv,
                parking: post.parking,
                city: post.city.id,
                latitude: post.latitude ? post.latitude : '',
                longitude: post.longitude ? post.longitude : '',
            })
            setPosteImages([post.images])
            setImagesSRC(() => {
                const images = post.images.map((img) => {
                    return img.image
                })
                return images
            })
            setPosition([post.latitude, post.longitude])
        }
    }, [success, post])

    const handelStep = (s) => {
        if (s > 0 && s < 4) setStep(s)
    }
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
        newData.append('id', post.id)
        newData.append('title', values.title)
        newData.append('description', values.description)
        newData.append('area', values.area)
        newData.append('borough', values.borough)
        newData.append('property_type', values.property_type)
        newData.append('property_status', values.property_status)
        newData.append('price', values.price)
        newData.append('rental_frequency', values.rental_frequency)
        newData.append('rooms', values.rooms)
        newData.append('furnished', values.furnished)
        newData.append('pool', values.pool)
        newData.append('elevator', values.elevator)
        newData.append('cctv', values.cctv)
        newData.append('parking', values.parking)
        newData.append('city', values.city)
        newData.append('latitude', position[0])
        newData.append('longitude', position[1])

        // for (let i = 0; i < postImages.length; i++) {
        //     newData.append('images', postImages[i], postImages[i].name)
        // }

        updateProperty(newData).unwrap()


    };


    const handleFileChange = (e) => {
        const files = new Array()
        let imagesSrc = new Array()
        for (let i = 0; i < e.target.files.length; i++) {
            const img = e.target.files[i]
            files.push(img)
            const image_src = URL.createObjectURL(img)
            imagesSrc.push(image_src)
        }
        setPosteImages(files)
        setImagesSRC(imagesSrc)
    }




    useEffect(() => {
        if (isSuccess) {
            // setInitialValues(initState)
            props.onHide()
            toast.success('Property add Successfully')
        }
    }, [isSuccess])

    return (
        <Modal
            {...props}
            onShow={() => getProperty(props.id)}
            // onHide={handleClearFormData}
            size="lg"
            centered
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="align-center">
                    Edit Property
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0 mb-4 mt-3">
                <Form onSubmit={handleSubmit(onSubmit)} style={{ minHeight: "450px" }}>
                    {step == 1 && (
                        <InfoEditForm register={register} errors={errors} watch={watch} requestError={error} />
                    )}

                    {step == 2 && (
                        <ImagesEditForm
                            register={register}
                            errors={errors}
                            watch={watch}
                            requestError={error}
                            imagesSRC={imagesSRC}
                            setImagesSRC={setImagesSRC}
                            setPosteImages={setPosteImages} />
                    )}

                    {step == 3 && (
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
                    <div>{step < 3 && <Button variant="primary" onClick={() => handelStep(step + 1)}>Next<FaAngleRight size={20} /></Button>}</div>
                </div>
            </Modal.Body>
        </Modal>

    )
}

export default memo(EditProperty);