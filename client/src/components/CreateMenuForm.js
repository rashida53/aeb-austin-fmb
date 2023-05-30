import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_ALL_COOKS, GET_ALL_DISHES } from "../utils/queries";
import { CREATE_MENU } from "../utils/mutations";

const CreateMenuForm = () => {
    const { register, handleSubmit } = useForm();

    const [createMenu, { data: createMenuData }] = useMutation(CREATE_MENU);

    const onSubmit = async (menuData, event) => {
        const amount = parseFloat(menuData.amount);
        try {
            const { data } = await createMenu({
                variables: {
                    dish: menuData.dishId,
                    cook: menuData.cookId,
                    menuDate: menuData.menuDate,
                    isPaid: false
                },
            });
            console.log("menu data", menuData)
        } catch (err) {
            console.error(err);
        }
    }
    const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
    let cooks = getCookData?.cooks || [];

    const { loading: dishLoading, data: getDishData } = useQuery(GET_ALL_DISHES);
    let dishes = getDishData?.dishes || [];

    console.log(dishes)

    return (
        <>
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