import { Button, Card } from "react-bootstrap"
import { FaMapMarkerAlt } from "react-icons/fa"
// import ImageListing from "./ImageListing"
import { setPosition, setPropertyID } from "features/properties/map/mapSlice"
import { memo } from "react"
import { useDispatch } from "react-redux"
import { IProperty } from "types/properties"
import ListingImage from "./ListingImage"

type ListingCardType = {
    property:IProperty
}
const ListingCard = memo(({ property }:ListingCardType) => {
    const dispatch = useDispatch()
    console.log('rander', property.id)
    // const {setPosition,setPropertyID} = useMapPropertiesDispatch()
    // const [position, setPosition] = useState<number[]>([])

    
    if (!property) return null
    return (
        <Card className="mt-3 border shadow-sm">
            <div className="d-flex px-3 py-2">
                <div className="d-flex justify-content-between">
                    <h5>{property.title}</h5>
                    {/* <h5>{property.property_type}</h5> */}
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
                        // onClick={handleClick}>
                        onClick={() => dispatch(setPosition({lat:property.latitude, lng:property.longitude}))}>
                        <FaMapMarkerAlt color="blue" size={18} />
                    </Button>
                </div>
            </div>
            <ListingImage images={property.images}/>
            <Card.Body className="">
                {/* <Card.Title>{item.title}</Card.Title> */}
                <p className="p-2">item.description </p>

                {/* <Link to={`/properties/${item.id}/`}>
                    <Button size="sm" variant="secondary">Detail</Button>
                </Link> */}
                    <Button onClick={()=>dispatch(setPropertyID(property.id))} size="sm" variant="secondary">Detail</Button>
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
})
export default ListingCard