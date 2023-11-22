import hoseIconPng from "assets/icons/office-building.png"
import { Icon } from 'leaflet';
import { Card } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet";

const ListMarker = ({listings})=>{
    const houseIcon = new Icon({
        iconUrl:hoseIconPng,
        iconSize:[40,40]
    })    
    return(
        <>
            { Array.isArray(listings) && listings.map((item,idx) =>(
            <Marker key={item.id} position={item.location.coordinates} icon={houseIcon}>
                <Popup >                                   
                    <Card className='border' style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Img variant="top" src={item.images[0].image} />
                            <Card.Text>
                            {item.description.substring(0,150)}
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>                                           
                        </Card.Body>
                        </Card>                                    
                </Popup>
            </Marker>
            )
            )}  
        </>
    )
}

export default ListMarker