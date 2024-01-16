import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNavbar from "components/navbar/top/TopNavbar";


const MainLayout = () => {
    return (
        <div>
            <TopNavbar />
            <Container fluid className="pt-5   position-relative">
                <div className="py-0 mt-1 w-100 h-100">
                    <Outlet />
                </div>
            </Container>
        </div>
    )
}

export default MainLayout;