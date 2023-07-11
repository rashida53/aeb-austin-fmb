import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import DishList from "../components/DishList";
import UpcomingDishList from "../components/UpcomingDishList";

const Dishes = () => {
    return (
        <>
            <div className="navAndHeader">
                <Nav />

            </div>
            <h1>Dishes</h1>
            <UpcomingDishList />
            <DishList />
        </>
    )
};

export default Dishes;