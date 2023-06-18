import React, { useState, useEffect } from "react";
import mockPhoto from '../assets/dishPhotoPlaceholder.jpg';
import { Image, Transformation } from "cloudinary-react";

const ImageCard = (props) => {
    const [imageId, setImageId] = useState("");

    useEffect(() => {
        if (props.image) {
            let newImage = `${props.image}.png`
            setImageId(newImage)
        }
    }, [props.image])

    return (
        <>
            {/* {imageId ? (

        )} */}
        </>
    )
}