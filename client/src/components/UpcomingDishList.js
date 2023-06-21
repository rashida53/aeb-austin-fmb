import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import SectionHeader from "./SectionHeader";
import { GET_THIS_WEEKS_DISHES } from "../utils/queries";
import CreateMenuForm from "./CreateMenuForm";
import { isDateXDaysFromToday, timeConverter } from "../utils/timeConverter";

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

                <CreateMenuForm thisWeeksDishes={thisWeeksDishes} setThisWeeksDishes={setThisWeeksDishes} />

                <SectionHeader title="Upcoming Dishes" />
                <div className="dishContainer">
                    {thisWeeksDishes && thisWeeksDishes
                        .filter(menu => isDateXDaysFromToday(menu.menuDate, 0))
                        .map(menu => (
                            <>
                                <div className="dishesRow">
                                    <p>{menu.dish?.dishName}</p>
                                    <p>{timeConverter(menu.menuDate)}</p>
                                    <p>{menu.cook?.fullName}</p>
                                </div>
                                <hr className="dishRowLine" />
                            </>

                        ))}
                </div>
            </div>
        </>
    )
}

export default UpcomingDishList;
