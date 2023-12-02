import { store } from "app/store"
import { useGetCitiesQuery } from "features/core/tools"
import { selectMapFilter, setPropertyType, setQueryParams } from "features/properties/map/mapSlice"
import { propertyAPI, useGetPropertiesFilterMutation, useLazyGetPropertiesQuery } from "features/properties/propertyAPI"
import { useCallback, useState } from "react"
import { Button, Form, Offcanvas } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { FaSlidersH } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { ICity, property_type } from "types/properties"

type FormValues = {
    city: number | null,
    category?: string,
    property_type?: string[],
    price?: { min: number, max: number }

}

const MapPropertiesFilter = () => {
    const dispatch = useDispatch()
    const { data:cities } = useGetCitiesQuery({})
    const  {propertyType}= useSelector(selectMapFilter)
    
    // const [getPropertiesFilter] = useGetPropertiesFilterMutation()
    // const [getPropertiesFilter] = useGetPropertiesFilterMutation()
    const [show, setShow] = useState(false);
    // const [propertyType, setPropertyType] = useState<string[]>([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initState = {
        city: 0,
        property_type: [],
        price: { min: 5, max: 50 },
        category: '',
        // price: '1000',
        // price_per: '',
        // amenities: [1, 2, 3],
        // rooms: '10',
    }
    const [initialValues, setInitialValues] = useState(initState);
    const {
        register,
        handleSubmit,        
        formState: { errors }
    } = useForm<FormValues>({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        defaultValues: initialValues,
        // errors: {}
    });

    //http://localhost:8000/api/properties/?city=0&property_type=House&price=%5Bobject+Object%5D&property_type__in=Apartment,


    const onFilter = (values: FormValues) => {
        let query: string = '?';
        if (values.city != null && values.city > 0 ) query += 'city=' + values.city

        if (values.category) query += '&category=' + values.category

        if (propertyType.length) {
            query += '&property_type__in=';
            propertyType.forEach(element => {
                query += element + ','
            });
        }
        // dispatch(trigger(query))
        dispatch(setQueryParams(query))
        console.log(query)

        // dispatch(propertyAPI.endpoints.getProperties.initiate({}))

        // getPropertiesFilter(query)
        // setQueryParams(query)
        setShow(false)
    }
    const isInPropertyType = useCallback((p:string)=>{
        return propertyType.includes(p)
    },[propertyType])


    

    const handleChekbox = (val: string) => {
        dispatch(setPropertyType(val))       
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Filter <FaSlidersH />
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
                                    {cities && cities.map((city:ICity) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-4 ">
                                <Form.Label className="h5">Property Type</Form.Label>

                                {property_type.map((p, id) => (
                                    <Form.Check
                                        onChange={() => handleChekbox(p)}
                                        checked={isInPropertyType(p)}
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