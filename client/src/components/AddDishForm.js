import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ADD_DISH } from "../utils/mutations";
import SectionHeader from "../components/SectionHeader";

const AddDishForm = ({ dishes, setDishes }) => {
    const { register, handleSubmit, reset } = useForm();

    const [addDish] = useMutation(ADD_DISH);

    const onSubmit = async (dishData) => {
        try {
            const { data } = await addDish({
                variables: {
                    dishName: dishData.dishName,
                    category: dishData.category,
                },
            });
            dishes = [...dishes, dishData];
            setDishes(dishes);

            reset({
                dishName: '',
                category: '',
            })
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="addDishForm">
                <input {...register("dishName", { required: true })} placeholder="Name"></input>
                <input {...register("category", { required: true })} placeholder="Category"></input>
                <input type="submit" value="Add Dish"></input>
            </form>
        </>
    )
};

export default AddDishForm;
