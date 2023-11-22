import { Card, ListGroup } from "react-bootstrap";
import { BsChatSquareText, BsBinoculars, BsGearFill, BsHouseDoor, BsListUl, BsCollectionPlay } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserAvatar from "components/common/UserAvatar"
import useAuth from "hooks/useAuth";
import UpdateAvatar from "./UpdateAvatar";
const size = 25
const items = [
    {
        name: 'Personal Info',
        to: '/account/info/',
        icon: <BsHouseDoor size={size} />
    },
    {
        name: 'Password & Security',
        to: '/account/security/',
        icon: <BsListUl size={size} />
    },
    {
        name: 'My Properties',
        to: '/messaging/',
        icon: <BsChatSquareText size={size} />
    },
    {
        name: 'Wishlist',
        to: '/user/friends/',
        icon: <BsBinoculars size={size} />
    },
    {
        name: 'Reviews',
        to: '/user/warch/',
        icon: <BsCollectionPlay size={size} />
    },
    {
        name: 'Settings',
        to: '/user/settings/',
        icon: <BsGearFill size={size} />
    },
]

const AccountCard = ()=>{
    const {user} = useAuth()
    return(
        <Card className="mb-3">
            <Card.Body>
                <UserAvatar src={user.avatar} size={200}/>
                <UpdateAvatar/> 
            </Card.Body>
        </Card>
    )
}

const AccountSidebar = () => {
    return (
        <>
            <AccountCard/>
            <ListGroup className="rounded sticky-top ">
                {
                    items.map((item, idx) => (
                        <ListGroup.Item
                            key={idx}
                            as={Link}
                            to={item.to}
                            className="d-flex justify-content-between align-items-start py-3"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    {item.icon} {item.name}
                                    {/* <BsChatSquareText  size={25}/>  Cras justo odio */}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </>
    )
}

export default AccountSidebar;