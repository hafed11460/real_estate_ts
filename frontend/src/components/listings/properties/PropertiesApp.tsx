import { Col, Container, Row } from "react-bootstrap"
import PropertiesList from "./PropertieList"
import ProprtiesFilter from "./PropertiesFilter"

const PropertiesApp = () => {
    return (
        <Container>
            <Row>
                <Col md={{ order: 1, span: 3 }} >
                    <ProprtiesFilter />
                </Col>
                <Col md={{ order: 2, span: 9 }} >
                    <PropertiesList />
                </Col>
            </Row>
        </Container>
    )
}
export default PropertiesApp