import { Button, Card, Carousel } from "react-bootstrap"
import { FaExpandArrowsAlt, FaMapMarkerAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { IProperty } from "types/properties"

type PropertyCardProps = {
    property:IProperty
}

export const PropertyCard = ({property}:PropertyCardProps) => {
    return (
        <Card className=" border shadow-sm h-100 rounded-top ">
            {
                <Carousel indicators={false}>
                    {Array.isArray(property.images) && property.images.map((img,idx )=> (
                        <Carousel.Item key={idx}>
                            <img style={{ maxHeight: '200px', minHeight: '200px' }}
                                className="d-block w-100 rounded-top"
                                src={img.image}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            }
            <Card.Body className="">
                <div className="d-flex justify-content-between">
                    <Card.Title>{property.title}   </Card.Title>
                    <small>{property.created_at?.substring(0, 10)}</small>
                </div>
                <p className="p-2">{property.description?.substring(0, 100)}</p>
                <p> <FaExpandArrowsAlt/>: 250 | <FaMapMarkerAlt/> {property.city?.name}</p>               
            </Card.Body>
            <Card.Footer className="border-0 d-flex justify-content-between">
                <Link to={`/properties/${property.id}/`}>
                    <Button size="sm" variant="secondary">Detail</Button>
                </Link>
                <div className="d-flex align-items-center">
                    <Link to={`/agencies/${property.agency?.id}/`} className=" text-decoration-none">
                        <div className="flex-grow-1 ms-3">
                            <h6> {property.agency?.name} </h6>
                        </div>
                    </Link>
                </div>
            </Card.Footer>
        </Card>
    )
}
export default PropertyCard