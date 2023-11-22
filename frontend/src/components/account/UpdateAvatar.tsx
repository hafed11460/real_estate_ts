import { useUpdateUserAvatarMutation } from "features/auth/authApi";
import { getItemFromStore } from "helpers/utils";
import useAuth from "hooks/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";

import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const UpdateAvatar = () => {
    const { user, setObjectItemToStore } = useAuth()
    const [updateUserAvatar, { data, isSuccess, isLoading, isError, error }] = useUpdateUserAvatarMutation()
    const [show, setShow] = useState(false);
    const size = 280
    const [imagesSRC, setImagesSRC] = useState(user?.avatar)
    const [avatar, setAvatar] = useState()

    const onSubmit = async () => {
        let newData = new FormData()
        newData.append('image', avatar, avatar.name)
        updateUserAvatar(newData).unwrap()
    };

    const handleFileChange = (e) => {
        console.log('handle file change ')
        setAvatar(e.target.files[0])
        setImagesSRC(URL.createObjectURL(e.target.files[0]))
    }

    // const onSubmit = async () => {
    //     if (typeof avatar === undefined) return; 

    //     let formData = new FormData()
    //     console.log(avatar)
    //     formData.append('image', avatar , avatar.name )        
    //     updateUserAvatar(formData)//.unwrap()
    // };

    // const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    //     const target = e.target as HTMLInputElement &{
    //         files:FileList
    //     }
    //     // const {files } = e.target
    //     // const selectedfiles = files as FileList
    //     setAvatar(target.files[0])
    //     console.log('handle file change ' , target.files[0])
    //     setImagesSRC(URL.createObjectURL(target.files[0]))
    // }

    useEffect(() => {
        if (isSuccess) {
            setShow(false)
            toast.success('Picture updated Successfully')
        }
        if (data) {
            const u = getItemFromStore('user', null)
            setImagesSRC(data.image)
            setObjectItemToStore('avatar', data.image, 'user')
        }
    }, [isSuccess, data])
    return (
        <>
            <div>
                <Button variant="light" onClick={() => setShow(!show)}>
                    <FaEdit /> Edit
                </Button>

                <Modal
                    show={show}
                    size={'lg'}
                    onHide={() => setShow(false)}
                    centered
                    aria-labelledby="contained-modal-title-vcenter"
                >

                    <Modal.Body className="py-0 mb-4 mt-3">
                        <div className='text-center border-0'>
                            <img width={size} height={size} src={imagesSRC} className="rounded-circle" />
                        </div>
                        <div className="row mt-3">
                            <Col>
                                <Form.Control className="bg-secendary"
                                    onChange={handleFileChange}
                                    type="file">
                                </Form.Control>
                            </Col>
                            <Col>                                
                                <Button className="w-100" onClick={onSubmit} >
                                    save
                                </Button>
                            </Col>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
export default UpdateAvatar