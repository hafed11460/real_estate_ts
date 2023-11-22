import { WS_URL } from "features/BASE_URL";
import { selectAccessToken } from "features/auth/authSlice";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BsBuilding, BsChatRightDotsFill, BsHouseDoorFill } from "react-icons/bs";
import { FaHandsHelping, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { iconSize } from "value";
import Authentication from "./Authentication";
import ProfileDropdwon from "./ProfileDropdown";

const itemslink = [
    { name: 'Home', 'to': '/', icon: <BsHouseDoorFill size={iconSize} /> },
    { name: 'Map','to':'/map/', icon: <FaMapMarkerAlt size={iconSize} /> },
    { name: 'Properties','to':'/properties/', icon: <BsBuilding size={iconSize} /> },
    { name: 'Agencies','to':'/agencies/', icon: <FaHandsHelping size={iconSize} /> },
    // { name: 'Agency','to':'/Agency/', icon: <FaHandsHelping size={iconSize} /> },
]

const TopNavbar = () => {
    const [socketUrl, setSocketUrl] = useState(`${WS_URL}/notifications/`);
    const token  = useSelector(selectAccessToken)
    // const { readyState, sendJsonMessage } = useWebSocket(socketUrl, {
    //     onOpen: () => {
    //         console.log('Connected!')
    //     },
    //     onClose: () => {
    //         console.log('Reconnecting Websocket ')
    //         setSocketUrl(null)
    //         // setTimeout(function () {
    //         //     setSocketUrl(`${WS_URL}/notifications/`)
    //         // }, 1000);
    //     },
    //     onMessage: (e) => {
    //         const data = JSON.parse(e.data)
    //         console.log(data)
    //     }
    // })
    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[readyState];
    return (
        <Navbar
            bg='white'
            // variant="dark"
            className="fixed-top border-bottom shadow-sm"
        >
            <Container >
                {/* <Navbar.Brand>Network</Navbar.Brand> */}
                {itemslink && itemslink.map((item, idx) => (
                    <Nav className='me-auto p-0 mx-2 ' key={idx}>
                        <Nav.Link to={item.to} as={Link} className="d-flex  me-4 p-0 align-content-center" style={{}}>
                            <div className="d-block text-center" >
                                {item.icon}
                            </div>
                            <div className="mx-1">
                                {item.name}
                            </div>
                        </Nav.Link>
                    </Nav>
                ))}

                {/* <Nav className='me-auto'>
                    <Nav.Link to='/' as={Link} >{connectionStatus} </Nav.Link>
                </Nav> */}
                <Navbar.Collapse id="responsive-navbar-nav border">
                    <Nav className="ms-auto g-2">
                        <div className="d-flex align-items-end">
                            {/* <MessageDropdown width={300} /> */}
                            {/* <NotificationDropdown width={300} /> */}
                            {token ?
                            <>
                                <ProfileDropdwon /> 
                                {/* <CreateProperty/> */}
                            </>:
                                <Authentication />
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNavbar;