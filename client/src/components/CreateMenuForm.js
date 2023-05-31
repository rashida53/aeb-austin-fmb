import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_ALL_COOKS, GET_ALL_DISHES } from "../utils/queries";
import { CREATE_MENU } from "../utils/mutations";
import SectionHeader from "../components/SectionHeader";

const CreateMenuForm = ({ thisWeeksDishes, setThisWeeksDishes }) => {
    const { register, handleSubmit } = useForm();

    const [createMenu] = useMutation(CREATE_MENU);


    const onSubmit = async (thisWeeksDishesData, event) => {
        const amount = parseFloat(thisWeeksDishesData.amount);
        try {
            const { data } = await createMenu({
                variables: {
                    dish: thisWeeksDishesData.dishId,
                    cook: thisWeeksDishesData.cookId,
                    menuDate: thisWeeksDishesData.menuDate,
                    isPaid: false
                },
            });
            console.log("this weeks dishes BEFORE", thisWeeksDishes)
            thisWeeksDishes = [...thisWeeksDishes, thisWeeksDishesData];
            console.log("this weeks dishes AFTER", thisWeeksDishes)
            setThisWeeksDishes(thisWeeksDishes);
        } catch (err) {
            console.error(err);
        }
    }
    const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
    let cooks = getCookData?.cooks || [];

    const { loading: dishLoading, data: getDishData } = useQuery(GET_ALL_DISHES);
    let dishes = getDishData?.dishes || [];

    return (
        <>
            <SectionHeader title="Create Menu" />
            <form onSubmit={handleSubmit(onSubmit)} className="createMenuForm" >
                <select {...register("dishId", { required: true })}>
                    <option disabled selected value>-- Choose a Dish --</option>
                    {dishes && dishes.map((dish) => (
                        <option key={dish._id} value={dish._id}>{dish.dishName}</option>
                    ))}
                </select>
                <select {...register("cookId", { required: true })}>
                    <option disabled selected value>-- Choose a Caterer --</option>
                    {cooks && cooks.map((cook) => (
                        <option key={cook._id} value={cook._id}>{cook.fullName}</option>
                    ))}
                </select>
                <input type="date" format="yyyy-MM-dd" {...register("menuDate")}></input>

                <input type='submit' value='Create' />

            </form>
        </>
    )
};

export default CreateMenuForm;