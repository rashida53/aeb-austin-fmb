import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_MENUS, GET_ALL_DISHES, GET_THIS_WEEKS_DISHES } from "../utils/queries";
import CreateMenuForm from "../components/CreateMenuForm";
import AddDishForm from "../components/AddDishForm";
import { timeConverter } from "../utils/timeConverter";
import SectionHeader from "../components/SectionHeader";
import Header from "../components/Header";

const Dishes = (props) => {

    const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
    let menus = menuData?.menus || [];

    const { loading: dishLoading, data: getDishData } = useQuery(GET_ALL_DISHES);
    let dishes = getDishData?.dishes || [];

    const { loading: thisWeekDishLoading, data: thisWeekDishData } = useQuery(GET_THIS_WEEKS_DISHES);
    let thisWeeksDishes = thisWeekDishData?.thisWeeksDishes || [];


    return (
        <>
            <div className="mainContainer">


                <Header />
                <SectionHeader title="This Week's Dishes" />

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

                <SectionHeader title="All Dishes" />

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

                <SectionHeader title="Create Menu" />

                <div>
                    <CreateMenuForm />
                </div>
            </div>
        </>
    )
};

export default Dishes;