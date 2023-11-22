import { useGetPropertyIdQuery } from "features/properties/propertyAPI";
import { Col, Container, Image, Row } from "react-bootstrap";

import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";
import { IProperty, IPropertyImage } from "types/properties";

type CarouselImagesProps={
    images:IPropertyImage
}

const CarouselImages = ({ images }: CarouselImagesProps) => {
    console.log(images)
    return (
        <div className=" border rounded p-2  shadow-sm bg-white">
            <Carousel style={{ maxHeight: '450px' }} >
                {Array.isArray(images) && images.map(item => (
                    <Carousel.Item key={item.id}>
                        <img style={{ maxHeight: '450px' }}
                            className="d-block w-100"
                            src={item.image}
                            alt={item.caption}
                        />
                        <Carousel.Caption>
                            <h3>{item.caption}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

type PropertyInfoProps = {
    property:IProperty
}

const PropertyInfo = ({ property }:PropertyInfoProps) => {
    const { title, property_type, rooms, property_status } = property
    return (
        <div className="p-3 mt-3 border rounded p-0 shadow-sm bg-white">
            <h3>Property Details</h3>
            <p> <strong>Apartment area : </strong>   {property_type}</p>
            <p><strong>Built : </strong></p>
            <p><strong>rooms : </strong> {rooms}</p>
            <p><strong>Bathrooms : </strong></p>
            <p><strong>Parking places : </strong></p>
            <p><strong>Bedrooms : </strong></p>
            <p><strong>Status : </strong> {property_status}</p>
            <p><strong>Bedrooms : </strong></p>
        </div>
    )
}


const PropertyDetail = () => {
    const { pid } = useParams();
    const { data, isLoading } = useGetPropertyIdQuery(pid)
    if (isLoading) return <h6>Loading ...</h6>
    return (
        <Container className="">
            <Row  >
                <Col md={{ span: 8, offset: 2 }}  >
                    <CarouselImages images={data.images} />
                </Col>
                <Col md={{ span: 8, offset: 2 }}  >
                    <PropertyInfo property={data} />
                </Col>
            </Row>
        </Container>
    )
}

export default PropertyDetail