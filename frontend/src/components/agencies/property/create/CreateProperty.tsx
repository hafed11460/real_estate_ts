
import { ChangeEvent, ReactNode, useContext, useState } from "react";
import { Button, Card, Col, Form, Modal, Nav, Row, Spinner } from "react-bootstrap";

import { useAddPropertyMutation } from "features/properties/propertyAPI";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaAngleLeft, FaAngleRight, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import InfoCreateForm from "./InfoCreateForm";
import PropertyMap from "./PropertyMap";
import ImagesForm from "./ImagesForm";
import ContactForm from "./ContactForm";
import DetailForm from "./DetailForm";
import { AgencyPropertyContext } from "../AgencyPropertyApp";
import { BsFileLock, BsGeoAltFill, BsGithub, BsHourglassBottom } from "react-icons/bs";
import CreateDone from "./CreateDone";


type CreatePropertyProps = {

}

export interface BasicInfoForm {
    title: string
    description: string,
    category: string,
    property_type: string,
    price: string,
}

export interface LocationFrom {
    latitude: string,
    longitude: string,
    city: string,
}

export interface ImagesFrom {
    images: string[]
}

export interface DetailForm {
    total_area: string,
    rooms: string,
    borough: string,
    price_per: string,
    amenities: string[],

}

export interface ContactForm {
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
}

export interface CreatePropertyFromData extends BasicInfoForm, LocationFrom, ImagesFrom, DetailForm {
    [key: string]: string | number | Array<any>,
}

const initState = {
    title: 'House In jijel',
    description: 'Lorem tincidunt lectus vitae id vulputate diam quam.',
    category: 'Sale',
    property_type: 'House',
    price: '1000',
    price_per: 'Day',
    city: '1',
    total_area: '150',
    amenities: ['1', '2', '3'],
    rooms: '10',
    latitude: '34',
    longitude: '5',
    images: [],

    first_name: 'hafed',
    last_name: 'string',
    email: 'hafed@gmail.com',
    phone: 'string',


}



export function useCreatePropertyForm() {
    const methods = useForm<CreatePropertyFromData>({
        defaultValues: initState
    })

    return {
        ...methods,
        handleSubmit: methods.handleSubmit
    }
}

const iconSize = 25
const navItems = [
    {
        icon: <BsFileLock size={iconSize} />,
        label: 'info'
    },
    {
        icon: <BsGithub size={iconSize} />,
        label: 'Details'
    },
    {
        icon: <BsGeoAltFill size={iconSize} />,
        label: 'Images'
    },
    {
        icon: <BsHourglassBottom size={iconSize} />,
        label: 'Contacts'
    },
    {
        icon: <BsHourglassBottom size={iconSize} />,
        label: 'Location'
    },
    {
        icon: <BsHourglassBottom size={iconSize} />,
        label: 'Success'
    }
];

interface NavItemPillProps {
    key: string,
    index: number,
    step: number,
    // handleNavs={handleNavs}
    icon: ReactNode,
    label: string
    handleNavs: (index: number) => void
}
const NavItemPill = ({ key, index, step, icon, label, handleNavs }: NavItemPillProps) => {
    return (
        <Nav.Item className=" m-1">
            <Button
                style={{maxWidth:'100px',minWidth:'100px'}}
                variant={index == step ? 'primary' : index < step ? 'success':''}
            // onClick={() => handleNavs(index)}
            // className={index == step ? 'active' : ''} 
            >
                <div className="d-flex flex-column justify-content-center"  >
                    <div className="text-center">
                        {icon}
                    </div>
                    <span className="d-none d-md-block mt-1 fs-10 ms-2">
                        {label}
                    </span>
                </div>
            </Button>
        </Nav.Item>
    )
}

const CreateProperty = (props: CreatePropertyProps) => {
    const { register,...methods } = useCreatePropertyForm()
    const lastStep = 6
    console.log('rundering CreateProperty')
    const [show, setShow] = useState(false);
    const [addProperty, { isLoading, isSuccess, isError, error }] = useAddPropertyMutation()

    // const { position } = useContext(AgencyPropertyContext)
    const [step, setStep] = useState(1)

    // const [initialValues, setInitialValues] = useState(initState);

    const onSubmitData = async (values: CreatePropertyFromData) => {
        if (step < lastStep)
            setStep(step + 1)
        if (step == lastStep) {

            let newData = new FormData()
            console.log(values)
            newData.append('title', values.title)
            newData.append('description', values.description)
            newData.append('category', values.category)
            newData.append('property_type', values.property_type)
            newData.append('price', values.price)
            newData.append('price_per', values.price_per)
            newData.append('rooms', values.rooms)
            newData.append('city', values.city)
            newData.append('total_area', values.total_area)
            newData.append('amenities', JSON.stringify([1, 2, 3]))
            newData.append('latitude', values.latitude)
            newData.append('longitude', values.longitude)

            for (let i = 0; i < values.amenities.length; i++) {
                newData.append('amenities[]', values.amenities[i])
            }

            for (let i = 0; i < values.images.length; i++) {
                console.log(values.images[i])
                newData.append('images', values.images[i])
            }
            addProperty(newData)
        }

    };

    const handelStep = () => {
        setStep(step - 1)
    }

    useEffect(() => {
        if (isSuccess) {
            // setInitialValues(initState)
            setShow(false)
            toast.success('Property add Successfully')
        }
    }, [isSuccess])

    const handleNavs = (index: number) => {
        setStep(index)
    }

    return (
        <FormProvider {...methods} register={register} >
            <Button onClick={() => setShow(!show)}>
                <FaPlusCircle /> Property
            </Button>

            <Modal
                className="p-0 m-0"
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Body
                    className="p-0"
                // className=" mb-4 mt-3 px-5 pt-5"
                >
                    <Card as={Form} onSubmit={methods.handleSubmit(onSubmitData)} style={{ minHeight: "550px",minWidth:'650px' }}>
                        <Card.Header
                        // className={classNames('bg-body-tertiary', {
                        //     'px-4 py-3': variant === 'pills',
                        //     'pb-2': !variant
                        // })}
                        >
                            <Nav variant="pills" className="justify-content-center" >
                                {navItems.map((item, index) => (
                                    <NavItemPill

                                        key={item.label}
                                        index={index + 1}
                                        step={step}
                                        handleNavs={handleNavs}
                                        icon={item.icon}
                                        label={item.label}
                                    />
                                ))
                                }
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            {step == 1 && (
                                <InfoCreateForm />
                            )}
                            {step == 2 && (
                                <DetailForm />
                            )}


                            {step == 3 && (
                                <ImagesForm />
                            )}

                            {step == 4 && (
                                <ContactForm />
                            )}

                            {step == 5 && (
                                <PropertyMap />
                            )}
                            {step == 6 && (
                                <CreateDone />
                            )}

                        </Card.Body>
                        <Card.Footer>

                            <div className="d-flex justify-content-between mt-3 ">
                                <div>
                                    {step > 1 && <Button variant="light" onClick={handelStep}>
                                        <FaAngleLeft size={20} />Prev
                                    </Button>}
                                </div>
                                <div>
                                    <Button type="submit" variant="primary" >
                                        Next<FaAngleRight size={20} />
                                    </Button>
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>

                </Modal.Body>
            </Modal>
        </FormProvider>
    )
}



export default CreateProperty;