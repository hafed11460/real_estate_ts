import { Button, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const Authentication = ()=>{
    return(
        <>
            <Nav>
                <Nav.Link to="/login" as={Link}  className="p-0 mx-2">            
                    <Button variant="secondary">Login</Button>
                </Nav.Link>
            </Nav>
            <Nav>                
                <Nav.Link to="/register" as={Link} className="p-0">            
                    <Button variant="danger" className="m-0">Register</Button>
                </Nav.Link>
            </Nav>
        </>
    )
}

export default Authentication