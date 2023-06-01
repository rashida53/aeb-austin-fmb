import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DISHES } from "../utils/queries";
import AddDishForm from "./AddDishForm";
import SectionHeader from "./SectionHeader";

const DishList = () => {

    const [dishes, setDishes] = useState([]);

    const { loading: dishLoading, data: getDishData } = useQuery(GET_ALL_DISHES);
    const dishData = getDishData?.dishes;

    useEffect(() => {
        if (!dishLoading) {
            setDishes(dishData);
        }
    }, [dishData]);

    return (
        <>
            <SectionHeader title="All Dishes" />
            <div className="mainContainer">
                {dishes && dishes.map((dish) => (
                    <div className="allDishes">
                        <p key={dish._id} id={dish._id}>{dish.dishName}</p>
                    </div>
                ))}
            </div>
            <SectionHeader title="Add Dishes" />
            <div>
                <AddDishForm dishes={dishes} setDishes={setDishes} />
            </div>
        </>
    );
}

export default DishList;

