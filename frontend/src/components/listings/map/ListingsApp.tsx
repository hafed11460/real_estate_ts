import "leaflet/dist/leaflet.css";
import { UIEvent, memo, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { MapContainer, ScaleControl, TileLayer, useMap } from 'react-leaflet';
import tileLayer from 'util/tileLayer';
// import CanvasPropertyDetail from './CanvasPropertyDetail';
import { selectCurrentPosition, selectQueryParams } from "features/properties/map/mapSlice";
import { useLazyGetPropertiesQuery } from "features/properties/propertyAPI";
import { useSelector } from "react-redux";
import { IProperty } from "types/properties";
import CanvasPropertyDetail from './CanvasPropertyDetail';
import ListMarker from './ListMarker';
import ListingCard from './ListingCard';
import MapPropertiesFilter from './MapPropertiesFilter';
// import MapPropertyProvider, { useMapProperties } from './MapPropertyProvider';


export const NavFilter = memo(() => {
    console.log('render NavFilter')
    // const { cities, setCityId } = useMapProperties()
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
})

export const ListingsMap = memo(() => {
    console.log('render ListingsMap')
    const map = useMap()
    const currentPosition = useSelector(selectCurrentPosition)
    // const { position } = useMapProperties()
    useEffect(() => {
        if (!map) return;
        if (!currentPosition) return;
        map.flyTo(currentPosition, 13)
    }, [map, currentPosition])

    return null
})


const TheMapComponent = memo(() => {
    console.log('render TheMapComponent')
    // const { position } = useMapProperties()
    const currentPosition = useSelector(selectCurrentPosition)
    return (
        <div className=' border border-secondary border-3 w-100 vh-100 '>
            <MapContainer

                style={{ height: "100%", width: "100%" }}
                center={[currentPosition.lat,currentPosition.lng]}
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
})

const Listings = () => {
    console.log('render Listings')
    const query = useSelector(selectQueryParams)
    const [trigger,{data,isLoading,isError,isSuccess}] = useLazyGetPropertiesQuery({})
    // const [trigger, { data,isLoading,isError,isSuccess } ] = propertyAPI.endpoints.getProperties.useLazyQuery()

    useEffect(()=>{
        trigger(query)
    },[query])
    
    // const { properties, queryParams, links } = useMapProperties()
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        if (event.currentTarget.scrollHeight === (event.currentTarget.scrollTop + event.currentTarget.offsetHeight)) {
            if (data.links){
                console.log(data.links)
                // let nextPage = links?.next
                // if (nextPage !== undefined  && nextPage !== null ){
                //     useGetPropertiesFilterMutation(nextPage.replace('http://localhost:8000/api/properties/',''))
                // }
            }
        }

    }
    if (isLoading) return <div> Loading</div>
    if (isError ) return <div> Error</div>
    if (isSuccess)
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
                                data.results && data.results.map((property:IProperty) => (
                                    <ListingCard key={`property_${property.id}`} property={property} />
                                ))
                            }
                        </div>
                    </div>
                </Col>

                <Col className=" border" xs={{ order: '1', span: 12 }} lg={{ order: '2', span: 9 }} xl={9} >
                    <TheMapComponent />
                </Col>
            </Row>
        </div>
    )
}

const ListingsApp = () => {
    console.log('render ListingsApp')
    return (
            // <MapPropertyProvider>
                <Listings />
            // </MapPropertyProvider>           
    )
}

export default ListingsApp;