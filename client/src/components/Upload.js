import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { UPLOAD_IMAGE } from "../utils/mutations";
import { Image, Transformation } from "cloudinary-react";

const UploadImage = (props) => {
  const { register, handleSubmit } = useForm();
  const [uploadImage, { error }] = useMutation(UPLOAD_IMAGE);
  const [imageId, setImageId] = useState("");

  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};

  useEffect(() => {
    if (props.dish.dishPhoto) {
      let newImage = `${props.dish.dishPhoto}.png`;
      setImageId(newImage)
    }


  }, [me])

  const submit = async (data, e) => {
    e.preventDefault();

    const file = data.dishPhoto[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    const dishPhoto = response.data.public_id;

    if (!dishPhoto) {
      return false;
    }

    try {
      await uploadImage({
        variables: { 
          dishPhoto: dishPhoto,
          dishId: props._id
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
      <form className="uploadPhotoForm" onSubmit={handleSubmit(submit)}>
        <label htmlFor="file-input">

          {!imageId ? (
           <p id="addCookPlus">
           +
         </p>
          ) : (
            <Image
            className="mediumPhoto"
            cloudName={process.env.REACT_APP_CLOUD_NAME}
            publicId={imageId}
            alt="Prof pic"
          >
            <Transformation
              width="345"
              height="345"
              gravity="face"
              radius="max"
              crop="fill"
              border="10px_solid_rgb:6789FF"
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

        <button type="submit">Save Photo</button>
      </form>
    </>
  );
};

export default UploadImage;
