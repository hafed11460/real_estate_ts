import hoseIconPng from "assets/icons/office-building.png";
import { selectQueryParams } from "features/properties/map/mapSlice";
import { useGetPropertiesQuery, useLazyGetPropertiesQuery } from "features/properties/propertyAPI";
// import { Icon } from 'leaflet';
import { memo, useEffect } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IProperty } from "types/properties";


// const houseIcon = new Icon({
//     iconUrl: hoseIconPng,
//     iconSize: [40, 40]
// })

type EstateMarkerProps = {
    property: IProperty
}
const EstateMarker = memo(({ property }: EstateMarkerProps) => {
    // const [position , setPosition] = useState([property.latitude?property.latitude:0, property.longitude?property.longitude:0])
    // console.log(property.id,position , item)
    return (
        <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            // position={position}
            // icon={houseIcon}
        >
            <Popup>


                <Carousel indicators={false}>
                    {(Array.isArray(property.images) && property.images) && property.images.map(img => (
                        <Carousel.Item key={property.id}>
                            <img style={{ maxHeight: '450px' }}
                                className="d-block w-100"
                                src={img.image}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Card className='m-0 border-0'>
                    <Card.Body className="">
                        <Card.Title>{property.title}</Card.Title>
                        <Card.Text>
                            {property.description && property.description.substring(0, 150)}
                        </Card.Text>
                        <Link to={`/properties/${property.id}/`} target="_blank">
                            <Button size="sm"> Detail</Button>
                        </Link>

                    </Card.Body>
                </Card>
            </Popup>
        </Marker>
    )
})
const ListMarker = () => {
    // const { data } = useGetPropertiesQuery({})
    const query = useSelector(selectQueryParams)
    const [trigger, { data, isLoading, isError, isSuccess }] = useLazyGetPropertiesQuery({})
    // const [trigger, { data,isLoading,isError,isSuccess } ] = propertyAPI.endpoints.getProperties.useLazyQuery()

    useEffect(() => {
        trigger(query)
    }, [query])

    if (isLoading) return null
    if (isSuccess)
        return (
            <>
                {Array.isArray(data.results) && data.results.map((property: IProperty) => (
                    <EstateMarker key={property.id} property={property} />
                )
                )}
            </>
        )
}

export default ListMarker