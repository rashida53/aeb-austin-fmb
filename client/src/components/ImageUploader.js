import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { UPDATE_DISH_AND_UPLOAD_IMAGE } from "../utils/mutations";
import { Image, Transformation } from "cloudinary-react";
import mockPhoto from '../assets/dishPhotoPlaceholder.jpg';

const ImageUploader = (props) => {
  const { register, handleSubmit } = useForm();
  const [updateDishWithImage, { error }] = useMutation(UPDATE_DISH_AND_UPLOAD_IMAGE);
  const [imageId, setImageId] = useState("");

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
      await updateDishWithImage({
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
        <label htmlFor={"file-" + props.id}>
          {!imageId ? (<img src={mockPhoto} className="dishPhoto" alt="Dish Photo Placeholder" />) : (
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
          type="file"
          id={"file-" + props.id}
          hidden
          className="uploadPhoto"
          accept="image/*"
          {...register("dishPhoto")}
        />

        <button type="submit"><p>Upload</p></button>
      </form>
    </>
  );
};

export default ImageUploader;
