import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_MENUS, GET_THIS_WEEKS_DISHES } from "../utils/queries";
import CreateMenuForm from "../components/CreateMenuForm";
import { timeConverter } from "../utils/timeConverter";
import SectionHeader from "../components/SectionHeader";
import Header from "../components/Header";
import Nav from "../components/Nav";
import DishList from "./DishList";

const Dishes = (props) => {

    const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
    let menus = menuData?.menus || [];

    const { loading: thisWeekDishLoading, data: thisWeekDishData } = useQuery(GET_THIS_WEEKS_DISHES);
    let thisWeeksDishes = thisWeekDishData?.thisWeeksDishes || [];

    return (
        <>
            <div className="navAndHeader">
                <Nav />
                <Header />
            </div>

            <div className="mainContainer">
                <h1>Dishes</h1>
                <SectionHeader title="Upcoming Dishes" />
                <div>
                    {thisWeeksDishes && thisWeeksDishes.map((menu) => (
                        <div className="weeklyDishContainer">
                            <div className="dishesRow">
                                <p>{menu.dish?.dishName}</p>
                                <p>{timeConverter(menu.menuDate)}</p>
                                <p>{menu.cook?.fullName}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <CreateMenuForm />

                <DishList />
            </div>
        </>
    )
};

export default Dishes;