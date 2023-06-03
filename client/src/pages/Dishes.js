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
                <Header />
            </div>
            <UpcomingDishList />
            <DishList />
        </>
    )
};

export default Dishes;