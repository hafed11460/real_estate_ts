import { useGetPropertiesFilterMutation } from "features/properties/propertyAPI"
import { useMapProperties } from "hooks/useMapProperties"
import { useState } from "react"
import { Button, Form, Offcanvas } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { FaSlidersH } from "react-icons/fa"
import { property_type } from "types/properties"
import Slider from 'react-slider'
import RangeSlider from "components/common/RangeSlider"

type FormValues = {
    city?:string | number,
    property_type: string[],
    price:{min:number,max:number}
    
}   

const MapPropertiesFilter = () => {
    const { cities, setCityId, queryParams, setQueryParams,getPropertiesFilter } = useMapProperties()
    // const [getPropertiesFilter] = useGetPropertiesFilterMutation()
    const [show, setShow] = useState(false);
    const [propertyType, setPropertyType] = useState<string[]>([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initState = {
        city: '',
        property_type: [],
        price:{min:5,max:50}
        // category: '',
        // price: '1000',
        // price_per: '',
        // amenities: [1, 2, 3],
        // rooms: '10',
    }
    const [initialValues, setInitialValues] = useState(initState);
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        defaultValues: initialValues,
        // errors: {}
    });
    
    const onFilter = (values:FormValues) => {        
        console.log(values)
        let query:string = '?' + new URLSearchParams(values).toString() ;
        setValue('property_type',propertyType)
        console.log(query)
        query += "&property_type__in="
        propertyType.forEach(element => {
            query += element +','
        });
          
        getPropertiesFilter(query)
        // setQueryParams(query)
        setShow(false)
    }
    const handleChekbox = (val:string) => {
        const findIdx = propertyType.indexOf(val)

        if (findIdx > -1) {
            setPropertyType((currents) =>
                currents.filter((p) => p !== val
                ))
        } else {
            setPropertyType((currents) => [...currents, val])
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <FaSlidersH />
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onFilter)}>
                    <Offcanvas.Header closeButton className='shadow-sm'>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <aside className="h-100 bg-white   py-3 rounded p-3">

                            <Form.Group>
                                <Form.Label className="h5">Location</Form.Label>
                                <Form.Select className=''
                                    {...register("city")}
                                >
                                    <option value={0}>-- All --</option>
                                    {cities && cities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4 ">
                                <Form.Label className="h5">Property Type</Form.Label>

                                {property_type.map((p, id) => (
                                    <Form.Check
                                        onChange={() => handleChekbox(p)}
                                        // selected={true}
                                        // selected={propertyType.includes(p)}
                                        key={id} type="checkbox" label={p} />
                                    // <option key={id} value={p}> {p}</option>
                                ))}
                            </Form.Group>
                            <p>Selected checkboxes: {JSON.stringify(propertyType)}</p>
                            <Form.Group className="mb-3 mt-4 ">
                                <Form.Label className="h5">Min </Form.Label>
                                <Form.Range  {...register('price')} />
                                    
                                <Form.Label className="h5">Max </Form.Label>
                                <Form.Range  {...register('price')} />
                            </Form.Group>
                              
                        </aside>
                    </Offcanvas.Body>
                    <Offcanvas.Header className='border border-top '>
                        <div className="w-100 d-flex justify-content-between">
                            <Button variant='secondary' className='rounded-pill'>Clear</Button>
                            <Button type="submit" variant='success rounded-pill'>Apply filtrs</Button>
                        </div>
                    </Offcanvas.Header>
                </Form>
            </Offcanvas>
        </>
    );
}

export default MapPropertiesFilter