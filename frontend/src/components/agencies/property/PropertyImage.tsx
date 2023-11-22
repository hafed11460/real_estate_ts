import React from 'react'
import { Image } from 'react-bootstrap'

const  ImageProperty =({src}:{src:string})=> {
  return (
    <Image fluid src={src}>

    </Image>
  )
}
export default ImageProperty
