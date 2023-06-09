import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ADD_COOK } from "../utils/mutations";

const CookForm = ({ cooks, setCook }) => {
  const { register, handleSubmit } = useForm();
  const [addCook] = useMutation(ADD_COOK);

  const onCookSubmit = async (cookData, event) => {
    try {
      const { data } = await addCook({
        variables: {
          fullName: cookData.fullName,
        },
      });
      const cookForm = document.querySelector(".cookForm");
      cookForm.style.visibility = "hidden";
      cooks = [...cooks, cookData];
      setCook(cooks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onCookSubmit)} className="cookForm">
        <input
          {...register("fullName", { required: true })}
          placeholder="Name"
        ></input>
        <input type="submit" value="Add cook" />
      </form>
    </>
  );
};

export default CookForm;
