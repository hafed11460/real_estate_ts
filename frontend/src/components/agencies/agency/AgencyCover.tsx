import cover from 'assets/img/chat/12.jpg'
import { selectCurrentUser } from 'features/auth/authSlice'
import { useSelector } from 'react-redux'
const AgencyCover = () => {
    // const { agency } = useSelector(selectCurrentUser)
    return (
        <div className='mb-3 box-sizing'>
            <img className='img-fluid w-100 rounded'
                style={{ maxHeight: '350px', minHeight: '300px',maxWidth:'100%' }}
                //  src={agency.cover}
            />
        </div>
    )
}

export default AgencyCover