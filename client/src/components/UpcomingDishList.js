import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import SectionHeader from "./SectionHeader";
import { GET_THIS_WEEKS_DISHES } from "../utils/queries";
import CreateMenuForm from "./CreateMenuForm";
import { timeConverter } from "../utils/timeConverter";

const UpcomingDishList = () => {

    const [thisWeeksDishes, setThisWeeksDishes] = useState([]);

    const { loading: thisWeekDishLoading, data: thisWeekDishData } = useQuery(GET_THIS_WEEKS_DISHES);
    let thisWeeksDishesData = thisWeekDishData?.thisWeeksDishes || [];

    useEffect(() => {
        if (!thisWeekDishLoading) {
            setThisWeeksDishes(thisWeeksDishesData);
        }
    }, [thisWeeksDishesData])

    return (
        <>
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
                <CreateMenuForm thisWeeksDishes={thisWeeksDishes} setThisWeeksDishes={setThisWeeksDishes} />
            </div>
        </>
    )
}

export default UpcomingDishList;
