import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DISHES } from "../utils/queries";
import AddDishForm from "./AddDishForm";
import SectionHeader from "./SectionHeader";
import DishPhotoCard from "./DishPhotoCard";
import ImageUploader from "./ImageUploader";

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
            <div className="mainContainer">
                <AddDishForm dishes={dishes} setDishes={setDishes} />
                <SectionHeader title="All Dishes" />
                <div className="allDishesContainer">
                    {dishes && dishes.map((dish) => (
                        <div className="allDishes">
                            <p key={dish._id} id={dish._id}>{dish.dishName}</p>
                            {dish.dishPhoto && <DishPhotoCard image={dish.dishPhoto} dish={dish} style={{ paddingBottom: '15px' }} />}
                            {!dish.dishPhoto && <ImageUploader id={dish._id} dish={dish} />}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DishList;

