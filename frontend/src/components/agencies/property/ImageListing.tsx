import React from 'react'
import { Image } from 'react-bootstrap'

interface ImageListingProps{
  src:string
}

const  ImageListing =({src}:ImageListingProps)=> {
  return (
    <Image fluid src={src}>

    </Image>
  )
}
export default ImageListing
