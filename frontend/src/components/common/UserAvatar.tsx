import { useSelector } from 'react-redux';

const AgencyAvatar = ({
    src=null,
    size=35,
    rounded='circle',
}) => {
    
    return (
        <div className='text-center border-0'>
            <img width={size} height={size} src={src} className="rounded-circle" />
        </div>
    )
}

export default AgencyAvatar;