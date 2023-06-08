import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_ALL_COOKS, GET_ALL_DISHES } from "../utils/queries";
import { CREATE_MENU } from "../utils/mutations";
import SectionHeader from "../components/SectionHeader";

const CreateMenuForm = ({ thisWeeksDishes, setThisWeeksDishes }) => {

    const { register, handleSubmit } = useForm();

    const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
    let cooks = getCookData?.cooks || [];

    const { loading: dishLoading, data: getDishData } = useQuery(GET_ALL_DISHES);
    let dishes = getDishData?.dishes || [];

    const [createMenu] = useMutation(CREATE_MENU);

    const onSubmit = async (newMenuItemData, event) => {
        let cook = JSON.parse(newMenuItemData.cook);
        let dish = JSON.parse(newMenuItemData.dish);
        try {
            const { data } = await createMenu({
                variables: {
                    dish: dish._id,
                    cook: cook._id,
                    menuDate: newMenuItemData.menuDate,
                    isPaid: false
                },
            });
            let newMenuItem = {
                _id: data._id,
                cook: cook,
                dish: dish,
                menuDate: new Date(newMenuItemData.menuDate).getTime()
            }
            thisWeeksDishes = [...thisWeeksDishes, newMenuItem];
            setThisWeeksDishes(thisWeeksDishes);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <SectionHeader title="Create Menu" />
            <form onSubmit={handleSubmit(onSubmit)} className="createMenuForm" >
                <select {...register("dish", { required: true })}>
                    <option disabled selected value>-- Choose a Dish --</option>
                    {dishes && dishes.map((dish) => (
                        <option key={dish._id} value={JSON.stringify(dish)}>{dish.dishName}</option>
                    ))}
                </select>
                <select {...register("cook", { required: true })}>
                    <option disabled selected value>-- Choose a Caterer --</option>
                    {cooks && cooks.map((cook) => (
                        <option key={cook._id} value={JSON.stringify(cook)}>{cook.fullName}</option>
                    ))}
                </select>
                <input type="date" format="yyyy-MM-dd" {...register("menuDate")}></input>

                <input type='submit' value='Create' />

            </form>
        </>
    )
};

export default CreateMenuForm;