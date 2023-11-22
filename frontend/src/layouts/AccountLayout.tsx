import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import AccountSidebar from "components/account/AccountSidebar";

const AccountLayout = () => {
    return (
        <div>
            {/* <TopNavbar /> */}
            <Container className="mt-1">
                <Row className="py-3">
                    <Col className="min-vh-100 "
                        xs={{ order: '2', span: 12 }}
                        lg={{ order: '1', span: 4 }}
                        xl={4}>
                        <div className="sticky-top">
                            <AccountSidebar />
                        </div>
                    </Col>
                    <Col className=""
                        xs={{ order: '1', span: 12 }}
                        lg={{ order: '2', span: 8 }}
                        xl={8} >                       
                        <div className=" p-5 bg-white rounded shadow-sm border ">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AccountLayout;