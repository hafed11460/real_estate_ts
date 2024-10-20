import { useGetPropertiesQuery } from "features/properties/propertyAPI"
import { Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap"
import PropertyCard from "./PropertyCard"
import ProprtiesFilter from "./PropertiesFilter"
import { FaChevronRight, FaSort } from "react-icons/fa"
import { IProperty } from "types/properties"

const PropertiesNavbar = () => {
    return (
        <div className=" p-2">
            <div className="my-5">
                <h3>Property For Sale</h3>
            </div>
            <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
                <div className="d-flex align-items-center flex-shrink-0">
                    <Form.Label htmlFor="sortby" className="text-nowrap me-2"><FaSort /> Sort by:</Form.Label>
                    {/* <label className="fs-sm me-2 pe-1 text-nowrap" for="sortby"> */}
                    <Form.Select size="sm" id="sortby">
                        <option>Newest</option>
                        <option>Popularity</option>
                        <option>Low - High Price</option>
                        <option>High - Low Price</option>
                        <option>High rating</option>
                        <option>Average Rating</option>
                    </Form.Select>
                </div>
                <hr className="d-none d-sm-block w-100 mx-4" />
                <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
                    <i className="fi-check-circle me-2"></i><span className="fs-sm mt-n1">148 results</span>
                </div>
            </div>
        </div>
    )
}

const PropertiesPagination = () => {
    return (
        <nav className="border-top pb-md-4 pt-4 mt-2" aria-label="Pagination">
            <ul className="pagination mb-1">
                <li className="page-item d-sm-none"><span className="page-link page-link-static">1 / 5</span></li>
                <li className="page-item active d-none d-sm-block" aria-current="page"><span className="page-link">1<span className="visually-hidden">(current)</span></span></li>
                <li className="page-item d-none d-sm-block"><a className="page-link" href="#">2</a></li>
                <li className="page-item d-none d-sm-block"><a className="page-link" href="#">3</a></li>
                <li className="page-item d-none d-sm-block">...</li>
                <li className="page-item d-none d-sm-block"><a className="page-link" href="#">8</a></li>
                <li className="page-item"><a className="page-link" href="#" aria-label="Next"><FaChevronRight /></a></li>
            </ul>
        </nav>
    )
}


const PropertiesList = () => {
    const { data } = useGetPropertiesQuery(null)
    if (!data) return <h3>No results</h3>
    return (
        <div className="bg-white rounded p-3">
            <PropertiesNavbar />
            <div className="my-3 py-2">
                <Row md={2} sm={1} xl={3}>
                    {
                        Array.isArray(data.results) && data.results.map((property: IProperty) => (
                            <Col key={property.id} className="mb-3">
                                <PropertyCard property={property} />
                            </Col>
                        ))
                    }
                </Row>
            </div>
            <PropertiesPagination />
        </div>
    )
}


export default PropertiesList