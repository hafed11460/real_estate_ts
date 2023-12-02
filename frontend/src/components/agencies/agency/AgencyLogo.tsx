import { RootState } from "app/store";
import UserAvatar from "components/common/UserAvatar";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const AgencyLogo = () => {
    // const { agency } = useSelector((state: RootState) => state.auth)
    return (
        <Card className="mb-3 border-0">
            <Card.Body>
                <UserAvatar size={200} />
                {/* <h4>{agency.name}</h4> */}
            </Card.Body>
        </Card>
    )
}

export default AgencyLogo;