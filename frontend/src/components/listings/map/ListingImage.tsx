import { memo } from "react"
import { Col, Image } from "react-bootstrap"
import { IPropertyImage } from "types/properties"

type ListingImageProps = {
    images: IPropertyImage[]
}

const ListingImage = memo(({ images }: ListingImageProps) => {
    return (
        <>
       { images && images.map((img, idx) => (
            <Col key={img.id} className="">
                {idx == 0 ?
                    <Image fluid src={img.image} />: null
                }
            </Col>
            ))}
        </>
    )
})
export default ListingImage