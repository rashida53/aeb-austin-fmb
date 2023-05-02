import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_MENUS, GET_ALL_DISHES } from "../utils/queries";
import CreateMenuForm from "../components/CreateMenuForm";
import AddDishForm from "../components/AddDishForm";

const Dishes = () => {

    const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
    let menus = menuData?.menus || [];

    const { loading: dishLoading, data: getDishData } = useQuery(GET_ALL_DISHES);
    let dishes = getDishData?.dishes || [];

    console.log("dishes", dishes)

    console.log(menus);


    return (
        <>
            <h1>This Week's Dishes</h1>

            <div>
                {menus && menus.map((menu) => (
                    <div className="weeklyDishContainer">
                        <div className="dishesRow">
                            <p>{menu.dish?.dishName}</p>
                            <p>April 10</p>
                            <p>{menu.cook?.fullName}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h1>All Dishes</h1>

            <div>
                {dishes && dishes.map((dish) => (
                    <div>
                        <div>
                            <ul>
                                <li key={dish._id} id={dish._id}>{dish.dishName}</li>
                            </ul>
                        </div>

                    </div>

                ))}

                <div>
                    <AddDishForm />
                </div>
            </div>

            <h1>Create Menu</h1>

            <div>
                <CreateMenuForm />
            </div>
        </>
    )
};

export default Dishes;