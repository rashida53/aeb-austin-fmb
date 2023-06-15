import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { UPLOAD_IMAGE } from "../utils/mutations";
import { Image, Transformation } from "cloudinary-react";
import mockPhoto from '../assets/dishPhotoPlaceholder.jpg';

const UploadImage = (props) => {
  const { register, handleSubmit } = useForm();
  const [uploadImage, { error }] = useMutation(UPLOAD_IMAGE);
  const [imageId, setImageId] = useState("");


  // useEffect(() => {
  //   if (props.dish.dishPhoto) {
  //     let newImage = `${props.dish.dishPhoto}.png`;
  //     setImageId(newImage)
  //   }
  // }, [me])

  const submit = async (data, e) => {

    e.preventDefault();
    const file = data.dishPhoto[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, formData);
    const dishPhoto = response.data.public_id;
    if (!dishPhoto) {
      return false;
    }
    try {
      await uploadImage({
        variables: {
          dishPhoto: dishPhoto,
          dishId: props.id
        },
      });

      let newImage = `${dishPhoto}.png`
      setImageId(newImage)

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form id={props.id} className="uploadPhotoForm" onSubmit={handleSubmit(submit)}>
        <label htmlFor="file-input">

          {!imageId ? (
 <img src={mockPhoto} className="dishPhoto" alt="Dish Photo Placeholder" />
          ) : (
            <Image
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={imageId}
              alt={props.dish.dishName}
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
          )}
        </label>
        <input
          id="file-input"
          hidden
          className="uploadPhoto"
          accept="image/*"
          type="file"
          {...register("dishPhoto")}
        />

        <button type="submit"><p>Upload</p></button>
      </form>
    </>
  );
};

export default UploadImage;
