import { Card, Col, Container, Row } from "react-bootstrap"
import { BsHouseFill } from "react-icons/bs"
import { ReactNode } from "react"
import { useGetPropertiesQuery } from "features/properties/propertyAPI"

const Section = ({children}:{children:ReactNode}) => {

    return (
        <Container className="py-5 my-4 shadow-sm ">
            {children}
        </Container>
    )
}

const propertyiesType = [
    { 'name': 'Houses', icon: <BsHouseFill size={40} color="orange"/> },
    { 'name': 'Apartments', icon: <BsHouseFill size={40} /> },
    { 'name': 'Commercial', icon: <BsHouseFill size={40} /> },
    { 'name': 'Rooms', icon: <BsHouseFill  size={40}/> },
    { 'name': 'Office', icon: <BsHouseFill size={40} /> },
    { 'name': 'New Building', icon: <BsHouseFill size={40} /> },
]

const PropertyType = () => {
    return (
        <Section >
            <Row>
                {propertyiesType.map((p,idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Body className="d-flex align-items-center flex-column mb-2">
                                <div className="border">{p.icon}</div>
                                <h5>{p.name}</h5>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Section>
    )
}

const AddToday = () => {
    return (
        <Section>
            <h2>Added today</h2>
        </Section>
    )
}

const TopOffers = () => {
    const { data } = useGetPropertiesQuery({})
    if (!data) return null
    return (
        <Section>
            <h2>Top Offers</h2>
            <Row md={3} sm={2} xl={3} >
                {
                    Array.isArray(data.results) &&  data.results && data.results.map((item, idx) => (
                        <Col key={item.id}>
                            <PropertyCard className="mt-2" item={item} />
                        </Col>
                    ))
                }
            </Row>
        </Section>
    )
}

const Home = () => {
    return (
        <div className="bg-white pt-5">
            <PropertyType />
            {/* <TopOffers /> */}
            {/* <AddToday /> */}
        </div>
    )
}

export default Home