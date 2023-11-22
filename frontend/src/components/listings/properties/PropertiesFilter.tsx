import { useGetCitiesQuery } from "features/core/tools"
import { useState } from "react"
import { Form } from "react-bootstrap"
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
                <div className="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0">
                    <ul className="nav nav-tabs mb-0">
                        <li className="nav-item"><a className="nav-link active" href="real-estate-catalog-rent.html"><i className="fi-rent fs-base me-2"></i>For rent</a></li>
                        <li className="nav-item"><a className="nav-link" href="real-estate-catalog-sale.html"><i className="fi-home fs-base me-2"></i>For sale</a></li>
                    </ul>
                </div>
                <Form.Group>

                    <Form.Label className="h5">Location</Form.Label>
                    <Form.Select className=''>
                        <option value={0}>-- All --</option>
                        {cities && cities.map((city:ICity) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 mt-4 ">
                    <Form.Label className="h5">Property Type</Form.Label>
                    <Form.Check  {...register("furnished")} type="checkbox" label="House" />
                    <Form.Check  {...register("pool")} type="checkbox" label="Apartment" />
                    <Form.Check  {...register("elevator")} type="checkbox" label="Room" />
                    <Form.Check  {...register("cctv")} type="checkbox" label="Office" />
                    <Form.Check  {...register("parking")} type="checkbox" label="Commercial" />
                    <Form.Check  {...register("parking")} type="checkbox" label="land" />
                </Form.Group>
                <Form.Group className="mb-3 mt-4 ">
                    <Form.Label className="h5">Price </Form.Label>
                    <Form.Range min={10} max={80} value={['10','80']} />
                </Form.Group>
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
            </Form>
        </aside>
    )
}

export default PropertiesFilter