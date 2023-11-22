import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import AgencyCover from "./AgencyCover"
import AgencyTabs from "./AgencyTabs"
import AgencyLogo from "./AgencyLogo"

const VendorAgency = ()=>{            
    return(
       <Container className="mt-4">
            {/* <div className="bg-white">
                <Row>
                    <Col className=""
                        xs={{ order: '2', span: 12 }}
                        lg={{ order: '1', span: 4 }}
                        xl={4}>  
                        <AgencyLogo/>
                    </Col>
                    <Col  className="p-1"
                        xs={{ order: '1', span: 12 }}
                        lg={{ order: '2', span: 8 }}
                        xl={8} >
                        <AgencyCover/>
                    </Col>
                </Row>
            </div>  */}
            <AgencyTabs/>
       </Container>
    )
}

export default VendorAgency