import React, { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import mockPhoto from '../assets/dishPhotoPlaceholder.jpg';

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
                    cloudName={process.env.REACT_APP_CLOUD_NAME}
                    publicId={imageId}
                    alt={props.dish?.dishName}
                    className='dishPhotoCardPhoto'
                >
                    <Transformation
                        width="130"
                        height="130"
                        gravity="auto"
                        radius="15"
                        crop="fill"
                        border="3px_solid_rgb:6B802A"
                    />
                </Image>
            ) : <img src={mockPhoto} className="dishPhoto" alt="Dish Photo Placeholder" />
            }
        </>
    )
};

export default DishPhotoCard;