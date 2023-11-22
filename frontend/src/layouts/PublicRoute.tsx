import TopNavbar from "components/navbar/top/TopNavbar"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const PublicRoute = () => {
    // const { user } = useSelector((state) => state.auth)
    return (
        <div>
            <TopNavbar />
            <Container fluid className="pt-5">
                <div className="pt-3">
                    <Outlet />
                </div>
            </Container>
        </div>
    )

    // return user == null ? <Outlet/> : <Navigate to ='/'/>
}

export default PublicRoute