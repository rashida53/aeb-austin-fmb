import React, { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import mockPhoto from '../assets/logo.png';


const DishPhotoCard = (props) => {
    const [imageId, setImageId] = useState("");

    useEffect(() => {
        if (props.image) {
            let newImage = `${props.image}.png`
            setImageId(newImage)
        }
    }, [props.image])

    return (
        <>
            {imageId ? (
                <Image
                    className="mediumPhoto topPhoto"
                    cloudName={process.env.REACT_APP_CLOUD_NAME}
                    publicId={imageId}
                    alt="Prof Pic"
                >
                    <Transformation
                        width="1000"
                        height="1000"
                        gravity="face"
                        radius="max"
                        crop="fill"
                        border="20px_solid_rgb:6789FF"
                    />
                </Image>
            ) : (
                <img src={mockPhoto} className="mediumPhoto" alt="prof pic" />
            )
            }
        </>
    )
};

export default DishPhotoCard;