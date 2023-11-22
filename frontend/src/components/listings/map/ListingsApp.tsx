import { PropertiesContext, useMapProperties, usePropertiesSource } from 'hooks/useMapProperties';
import "leaflet/dist/leaflet.css";
import { memo, useEffect,UIEvent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { MapContainer, ScaleControl, TileLayer, useMap } from 'react-leaflet';
import tileLayer from 'util/tileLayer';
// import CanvasPropertyDetail from './CanvasPropertyDetail';
import ListMarker from './ListMarker';
import ListingCard from './ListingCard';
import MapPropertiesFilter from './MapPropertiesFilter';
import CanvasPropertyDetail from './CanvasPropertyDetail';


export const NavFilter = () => {
    const { cities, setCityId } = useMapProperties()
    return (
        <>
            <div className="border bg-white p-2"
                style={{ position: 'sticky', top: '0px', width: '100%', zIndex: '1' }}>
                <div className='d-flex  justify-content-between'>
                    <Form.Label>
                        Filter
                    </Form.Label>
                    {/* <Form.Select className=''
                        onChange={(e) => setCityId(Number(e.target.value))}
                    >
                        <option value={0}>-- All --</option>
                        {cities && cities.map((city) => (
                            <option key={`city_${city.id}`} value={city.id}>{city.name}</option>
                        ))}
                    </Form.Select> */}
                    <div className='ms-2'>
                        <MapPropertiesFilter />
                    </div>
                </div>
            </div>
        </>
    )
}

export const ListingsMap = memo(() => {
    const map = useMap()
    const { position } = useMapProperties()
    useEffect(() => {
        if (!map) return;
        if (!position) return;
        map.flyTo(position, 13)
    }, [map, position])

    return null
})


const TheMapComponent = () => {
    const { position } = useMapProperties()
    return (
        <div className=' border border-secondary border-3 w-100 vh-100 '>
            <MapContainer

                style={{ height: "100%", width: "100%" }}
                center={position}
                zoom={9}
            >
                <TileLayer {...tileLayer} />
                <ScaleControl imperial={false} />

                <ListMarker />
                <ListingsMap />
                {/* {coordinates &&
                                <Polygon pathOptions={placeColor} positions={coordinates} />
                        } */}
            </MapContainer>
        </div>
    )
}

const Listings = () => {
    const { properties, queryParams,links } = useMapProperties()
    const handleScroll = (event:UIEvent<HTMLDivElement>) => {
        if (event.currentTarget.scrollHeight === (event.currentTarget.scrollTop + event.currentTarget.offsetHeight)) {
            console.log('params',links)
            let nextPage =  links?.next
            // if (nextPage !== undefined  && nextPage !== null ){
            //     useGetPropertiesFilterMutation(nextPage.replace('http://localhost:8000/api/properties/',''))
            // }
        }

    }
    return (
        <div>
            <CanvasPropertyDetail />
            <Row className="py-0  ">
                <Col onScroll={handleScroll}
                    className="min-vh-100   vh-100 overflow-auto  "
                    xs={{ order: '2', span: 12 }}
                    lg={{ order: '1', span: 3 }}
                    xl={3}
                >
                    <div className='position-relative'>

                        <NavFilter />
                        <div className="">
                            {
                                properties && properties.map((item) => (                                                                            
                                        <ListingCard  key={`property_${item.id}`} item={item} />                                
                                ))
                            }
                        </div>
                    </div>
                </Col>

                <Col className=" border" xs={{ order: '1', span: 12 }} lg={{ order: '2', span: 9 }} xl={9} >
                    {/* <TheMapComponent /> */}
                </Col>
            </Row>
        </div>
    )
}

const ListingsApp = () => {
    return (
        <PropertiesContext.Provider value={usePropertiesSource()}>
            <Listings />
        </PropertiesContext.Provider>
    )
}

export default ListingsApp;