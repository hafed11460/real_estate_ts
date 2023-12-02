import { Spinner } from "components/common/Spinner";
import { selectCurrentPositionID, setPropertyID } from "features/properties/map/mapSlice";
import { useGetPropertyMutation } from "features/properties/propertyAPI";
import { memo, useEffect } from "react";
import { Card, Carousel, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IProperty, IPropertyImage } from "types/properties";
// import { useMapProperties, useMapPropertiesDispatch } from "./MapPropertyProvider";

// const { FaChevronRight, FaSlidersH } = require("react-icons/fa");

const CarouselImages = memo(({ images }:{images:IPropertyImage[]}) => {
    console.log(images)
    return (
        <div className=" border rounded p-2  shadow-sm bg-white">
            <Row>
                <Col
                    // sm={{ span: 12 }}
                    // md={{ span: 8, offset: 2 }}
                >
                    <Carousel style={{ maxHeight: '450px' }} >
                        {Array.isArray(images) && images.map(item => (
                            <Carousel.Item key={item.id}>
                                <img style={{ maxHeight: '450px' }}
                                    className="d-block w-100"
                                    src={item.image}
                                    // alt={item.caption}
                                />
                                {/* <Carousel.Caption>
                                    <h3>{item.caption}</h3>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </div>
    );
})


const PropertyInfo = ({ property }:{property:IProperty}) => {
    const { title, property_type, rooms, property_status } = property
    return (
        <>
            <Card className="px-5 mt-5 border-0">
                <Card.Title>Overview</Card.Title>
                <Card.Body>
                    <p>{property.description}</p>
                </Card.Body>
            </Card>
            <Card className=" px-5 mt-5 border-0">
                <Card.Title>Property Details</Card.Title>
                <Card.Body>
                    <p> <strong>Apartment area : </strong>   {property_type}</p>
                    <p><strong>Built : </strong></p>
                    <p><strong>rooms : </strong> {rooms}</p>
                    <p><strong>Bathrooms : </strong></p>
                    <p><strong>Parking places : </strong></p>
                    <p><strong>Bedrooms : </strong></p>
                    <p><strong>Status : </strong> {property_status}</p>
                    <p><strong>Bedrooms : </strong></p>
                </Card.Body>
            </Card>

            <Card className=" px-5 mt-5 border-0">
                <Card.Title> Amenities</Card.Title>
                <Card.Body>
                    <Row>

                        {property.amenities && property.amenities.map((am) => (
                            <Col>{am.name}</Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}



const CanvasPropertyDetail = () => {
    const  propertyID  = useSelector(selectCurrentPositionID)
    const dispatch = useDispatch()
    const [getProperty, { data, isLoading, isSuccess }] = useGetPropertyMutation()
    useEffect(() => {
        if (propertyID)
            getProperty(propertyID)

    }, [propertyID])
    if (!propertyID) return null;
    // if (isLoading) return <h6>Loading ...</h6>


    return (
        <>
            <Row>
                <Col
                    sm={{ span: 12 }}
                    md={{ span: 8, offset: 2 }}
                >
                    <Offcanvas show={!!propertyID} onHide={() => dispatch(setPropertyID(null))}                        
                        style={{ width: "60%" }}
                        placement="end" >
                        <Offcanvas.Header closeButton className='shadow-sm'>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {isLoading && <Spinner />}
                            {data &&
                                <Container className="">
                                    <Row  >
                                        <Col md={{ span: 12 }}  >
                                            <CarouselImages images={data.images} />
                                        </Col>
                                        <Col md={{ span: 12 }}  >
                                            <PropertyInfo property={data} />
                                        </Col>
                                    </Row>
                                </Container>
                            }
                        </Offcanvas.Body>
                    </Offcanvas>
                </Col>
            </Row>
        </>
    );
}

export default CanvasPropertyDetail