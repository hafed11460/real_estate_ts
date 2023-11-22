import { useGetAgencyListQuery } from "features/agencies/agencyAPI"
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"


const AgenciesNavbar = () => {
    return (
        <Navbar bg="white" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

const AgencyList = () => {
    const navigate = useNavigate()
    const { data } = useGetAgencyListQuery({})
    return (
        <>
            <Container >
                <AgenciesNavbar />
                <div className="bg-white shadow-sm my-4 py-3 rounded p-3">
                    <Row className="row-cols-1 row-cols-md-2 g-4">
                        {Array.isArray(data) && data.map((a) => (
                            <Col onClick={() => navigate(`/agencies/${a.id}`)} style={{ cursor: 'pointer' }}>
                                <Card className="card mb-3  px-0" >
                                    <Row className="row g-0">
                                        <Col md={4}>
                                            <img src={a.logo} style={{ maxWidth: '180px' }} />
                                        </Col>
                                        <Col md={8}>
                                            <Card.Body>
                                                <Card.Title className="card-title">{a.name}</Card.Title>
                                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))
                        }
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default AgencyList