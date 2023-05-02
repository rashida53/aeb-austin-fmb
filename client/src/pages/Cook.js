import React from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_SINGLE_COOK, GET_COOKS_MENU_ITEMS } from "../utils/queries";
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { timeConverter } from '../utils/timeConverter';
import { ADD_COST } from '../utils/mutations';

const Cook = () => {
    const { cookId: cookParam } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_COOK, { variables: { cookId: cookParam } })
    const cook = data?.cook || {};

    const { loading: cookItemsLoading, data: cookItemsData } = useQuery(GET_COOKS_MENU_ITEMS, { variables: { cookId: cookParam } });
    const cookMenus = cookItemsData?.cookMenuItems;

    const { register, handleSubmit } = useForm();
    const [addCost] = useMutation(ADD_COST);

    const onSubmit = async (costData, event) => {
        const amount = parseFloat(costData.amount);
        try {
            const { data } = await addCost({
                variables: {
                    menuId: event.target.id,
                    amount: amount,
                },
            });
            console.log("cost data", costData);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1>{cook.fullName}</h1>

            <h1>This Week's Dishes</h1>

            <div>
                {cookMenus && cookMenus.map((cookMenu) => (
                    <div className="weeklyDishContainer">
                        <div className="dishesRow">
                            <p>{cookMenu.dish.dishName}</p>
                            <p>{timeConverter(cookMenu.menuDate)}</p>
                        </div>

                    </div>

                ))}

                <div>
                    <h1>Dish History</h1>

                    <p>Dish1</p>
                    <p>$10</p>
                    <p>April 2023</p>
                    <p>Dish1</p>
                    <p>$12</p>
                    <p>Feb 2023</p>
                    <p>Dish1</p>
                    <p>$9</p>
                    <p>Jan 2023</p>
                    <p>Dish2</p>
                    <p>$15</p>
                    <p>Jan 2023</p>
                    <p>Dish 3</p>
                    <p>$20</p>
                    <p>Jan 2023</p>
                </div>

                <div>
                    <h1>Pending Payments</h1>
                    {cookMenus && cookMenus.map((cookMenu) => (
                        <div className="weeklyDishContainer">
                            <div className="dishesRow">
                                <p>{cookMenu.dish.dishName}</p>
                                <p>{cookMenu.amount}</p>
                                <p>{timeConverter(cookMenu.menuDate)}</p>

                                <form onSubmit={handleSubmit(onSubmit)} id={cookMenu._id} >
                                    <input {...register("amount", { required: true })} placeholder="Amount"></input>
                                    <input type="submit" value="Add cost"></input>
                                </form>
                            </div>

                        </div>

                    ))}


                </div>
            </div>
        </>
    )
}

export default Cook;