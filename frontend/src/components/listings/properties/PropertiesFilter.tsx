import { useGetCitiesQuery } from "features/core/tools"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ICity } from "types/properties"

const PropertiesFilter = () => {

    const { data: cities } = useGetCitiesQuery({})
    const initState = {
        title: 'House',
        description: '',
        area: '',
        borough: '',
        property_type: '',
        property_status: '',
        price: '10000',
        min_price:'',
        max_price:'',
        rental_frequency: '',
        rooms: '',
        furnished: false,
        pool: false,
        elevator: false,
        cctv: false,
        parking: false,
        city: '',
        latitude: '34',
        longitude: '5',
        images: null,
    }
    const [initialValues, setInitialValues] = useState(initState);
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        defaultValues: initialValues,
        // errors: {}
    });
    return (
        <aside className="h-100 bg-white shadow-sm  py-3 rounded p-3">
            <Form>
                <Row>
                    <Form.Group as={Col} className="mx-2 p-0">
                        <Button variant="light shadow-sm" className="w-100">For rent</Button>
                    </Form.Group>
                    <Form.Group as={Col} className="mx-2 p-0">
                        <Button variant="secondary" className="w-100">For sale</Button>
                    </Form.Group>
                </Row>
                {/* <div className="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0">
                    <ul className="nav nav-tabs mb-0">
                        <li className="nav-item"><a className="nav-link active" href="real-estate-catalog-rent.html"><i className="fi-rent fs-base me-2"></i>For rent</a></li>
                        <li className="nav-item"><a className="nav-link" href="real-estate-catalog-sale.html"><i className="fi-home fs-base me-2"></i>For sale</a></li>
                    </ul>
                </div> */}
                <Form.Group className="my-4">
                    <Form.Label className="h5">Location</Form.Label>
                    <Form.Select className=''>
                        <option value={0}>-- All --</option>
                        {cities && cities.map((city: ICity) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </Form.Select>

                    <Form.Select className='mt-2'>
                        <option value={0}>-- All --</option>
                        {cities && cities.map((city: ICity) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="my-4 ">
                    <Form.Label className="h5 pb-2">Property Type</Form.Label>
                    <Form.Check  {...register("furnished")} type="checkbox" label="House" id='house' />
                    <Form.Check  {...register("pool")} type="checkbox" label="Apartment" id='apartment' />
                    <Form.Check  {...register("elevator")} type="checkbox" label="Room" id='room'/>
                    <Form.Check  {...register("cctv")} type="checkbox" label="Office" id='office' />
                    <Form.Check  {...register("parking")} type="checkbox" label="Commercial" id='commercial' />
                    <Form.Check  {...register("parking")} type="checkbox" label="Land" id='land' />
                </Form.Group>

                <div className="border-bottom my-4"></div>
                <Form.Group as={Col} className="mt-4 ">
                    <Form.Label className="h5">Price </Form.Label>
                    <Form.Range min={10} max={80} value={['10', '80']} />
                </Form.Group>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Control {...register("min_price")} type="number" />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Control {...register("max_price")} type="number"/>
                    </Form.Group>
                </Row>
                <div className="border-bottom my-4"></div>
                        
                <Form.Group className="mb-3 mt-4 ">
                    <Form.Label className="h5">Amenities</Form.Label>
                    <Form.Check  {...register("furnished")} type="checkbox" label="Air conditioning" />
                    <Form.Check  {...register("pool")} type="checkbox" label="Balcony" />
                    <Form.Check  {...register("elevator")} type="checkbox" label="Garage" />
                    <Form.Check  {...register("cctv")} type="checkbox" label="Gym" />
                    <Form.Check  {...register("parking")} type="checkbox" label="Parking" />
                    <Form.Check  {...register("parking")} type="checkbox" label="Security cameras" />
                    <Form.Check  {...register("parking")} type="checkbox" label="WiFi" />
                    <Form.Check  {...register("parking")} type="checkbox" label="Laundry" />
                    <Form.Check  {...register("parking")} type="checkbox" label="Dishwasher" />
                </Form.Group>
                <div className="border-bottom my-4"></div>
                <Row>
                    <Form.Group as={Col} className="mx-2 p-0">
                        <Button variant="light shadow-sm" className="w-100">Resset Filter</Button>
                    </Form.Group>
                    <Form.Group as={Col} className="mx-2 p-0">
                        <Button variant="success" className="w-100">Apply Filter</Button>
                    </Form.Group>
                </Row>                
            </Form>
        </aside>
    )
}

export default PropertiesFilter