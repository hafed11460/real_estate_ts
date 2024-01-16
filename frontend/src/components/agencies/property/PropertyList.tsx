
// import {posts} from 'data/posts/posts'

import PropertyCard from 'components/agencies/property/PropertyCard';
import { useGetAgencyPropertiesQuery } from 'features/properties/propertyAPI';
import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

const PropertyList = () => {   
    const { data: properties } = useGetAgencyPropertiesQuery({})
    useEffect(()=>{
        console.log('PropertyList redering ')
    })
    // if (!properties) {
    //     return <div>No reasults </div>
    // }
   
    return (
        <div className="bg-white p-2">
            <Row xs={1} md={3} className="g-4">
                {
                    Array.isArray(properties) && properties.map((item, idx) => (
                        <Col key={idx}>
                            <PropertyCard  key={item.id} property={item} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default memo(PropertyList);