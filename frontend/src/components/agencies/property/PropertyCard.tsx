import MDropdown from "components/common/MDropdown"
import { useDeletePropertyMutation } from "features/properties/propertyAPI"
import { memo, useState } from "react"
import { Card, Col, Dropdown } from "react-bootstrap"
import { BsPencilSquare, BsThreeDots, BsTrash } from "react-icons/bs"
import { iconSize, iconSize_sm } from "value"
import ImageListing from "./ImageListing"
// import EditProperty from "./EditProperty"
import useAuth from "hooks/useAuth"
import { IProperty } from "types/properties"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "features/auth/authSlice"
import { User } from "features/auth/authApi"

type DropdownMenuProps={
    postId?:number,
    handleEditProperty:()=>void
}

const PostDropdownMenu = memo(({ postId, handleEditProperty }:DropdownMenuProps) => {
    const [deleteProperty, { isSuccess }] = useDeletePropertyMutation()
    const handleDeleteProperty = async () => {
        deleteProperty({ id: postId })
    }
    return (
        <MDropdown icon={<BsThreeDots size={iconSize} />}>
            <>                
                <Dropdown.Item onClick={handleEditProperty}>
                    <BsPencilSquare size={iconSize_sm} /> <span className="ms-2">Edit</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteProperty}>
                    <BsTrash size={iconSize_sm} /> <span className="ms-2">Delete</span>
                </Dropdown.Item>
            </>
        </MDropdown>
    )
})

interface PropertyCardProps{
    property:IProperty
}
const PropertyCard = ({ property }:PropertyCardProps) => {
    const user:User | null  = useSelector(selectCurrentUser)
    console.log('PropertyCard redering ')
    const [editPost, setEditPost] = useState(false);

    const handleEditProperty = () => {
        setEditPost(!editPost)
    }

    return (
        <div>
            {/* <EditProperty id={property.id} 
                show={editPost} onHide={() => setEditPost(false)}/> */}
            
            <Card className="mt-3 border">
                <div className="d-flex p-2">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 ms-3">
                                <h6> {property.title} </h6>
                            </div>
                        </div>
                    </div>
                    {
                        (property?.agency?.id == user?.agency_id) &&
                    <div className="ms-auto  p-2">
                        <PostDropdownMenu handleEditProperty={handleEditProperty} postId={property.id} />
                    </div>
                    }
                </div>
                {
                    property && property?.images?.map((img, idx) => (
                        <Col key={img.id} className="">
                            {idx == 0 ?
                                <ImageListing src={img.image} /> : null
                            }
                        </Col>
                    ))
                }
                <Card.Body className="">
                    <Card.Title>{property.title}</Card.Title>
                    <p className="p-2">{property.description?.substring(0, 100)}</p>
                </Card.Body>
            </Card>

        </div>
    )
}
export default memo(PropertyCard)