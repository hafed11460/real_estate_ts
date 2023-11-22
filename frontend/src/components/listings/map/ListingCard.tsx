import { useMapProperties } from "hooks/useMapProperties"
import { Button, Card, Col } from "react-bootstrap"
import { FaMapMarkerAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import ImageListing from "./ImageListing"

const ListingCard = ({ item }) => {
    const { position, setPosition ,setPropertyID} = useMapProperties()
    if (!item) return null
    return (
        <Card className="mt-3 border shadow-sm">
            <div className="d-flex px-3 py-2">
                <div className="d-flex justify-content-between">
                    <h5>{item.title}</h5>
                    {/* <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                            <AgencyAvatar src={item.agency.logo} size={45} />
                        </div>
                        <Link to={`agencies/${item.agency.id}/`}>
                            <div className="flex-grow-1 ms-3">
                                <h6> {item.agency.name} </h6>
                            </div>
                        </Link>
                    </div> */}
                </div>
                <div className="ms-auto" >
                    <Button size="sm" variant="light border shadow-sm"
                        onClick={() => setPosition([item.latitude, item.longitude])}>
                        <FaMapMarkerAlt color="blue" size={18} />
                    </Button>
                </div>
            </div>
            {
                item.images && item.images.map((img, idx) => (
                    <Col key={img.id}  className="">
                        {idx == 0 ?
                            <ImageListing src={img.image} /> : null
                        }
                    </Col>
                ))
            }
            <Card.Body className="">
                {/* <Card.Title>{item.title}</Card.Title> */}
                <p className="p-2">item.description </p>

                {/* <Link to={`/properties/${item.id}/`}>
                    <Button size="sm" variant="secondary">Detail</Button>
                </Link> */}
                    <Button onClick={()=>setPropertyID(item.id)} size="sm" variant="secondary">Detail</Button>
                {/* <div className="d-flex align-items-center">
                    <Link to={`agencies/${item.agency.id}/`}>
                        <div className="flex-grow-1 ms-3">
                            <h6> {item.agency.name} </h6>
                        </div>
                    </Link>
                </div> */}
            </Card.Body>
        </Card>
    )
}
export default ListingCard