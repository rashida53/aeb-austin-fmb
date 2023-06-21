import React, { useEffect, useState } from "react";
import {PDFDownloadLink} from '@react-pdf/renderer';
import {useLazyQuery, useQuery} from "@apollo/client";
import SectionHeader from "./SectionHeader";
import {GET_SIGNUPS_FOR_MENU_ITEM, GET_THIS_WEEKS_DISHES} from "../utils/queries";
import CreateMenuForm from "./CreateMenuForm";
import {isDateXDaysFromToday, timeConverter} from "../utils/timeConverter";
import ListPdfDocument from "./ListPdfDocument";
import LabelsPdfDocument from "./LabelsPdfDocument";

const UpcomingDishList = () => {

    const [thisWeeksDishes, setThisWeeksDishes] = useState([]);

    const [getSignupsForMenu, {loading: pdfListLoading, error, data: getPdfListData}] = useLazyQuery(GET_SIGNUPS_FOR_MENU_ITEM, {variables: {menuId: ""}});

    const {loading: thisWeekDishLoading, data: thisWeekDishData} = useQuery(GET_THIS_WEEKS_DISHES);
    let thisWeeksDishesData = thisWeekDishData?.thisWeeksDishes || [];

    useEffect(() => {
        if (!thisWeekDishLoading) {
            setThisWeeksDishes(thisWeeksDishesData);
        }
    });

    const fetchMenuList = async (event) => {
        let id = event.target.id;
        await getSignupsForMenu({
            variables: { menuId: id }
        });
        console.log("PDF List", getPdfListData);
    };

    return (
        <>
            <div className="mainContainer">
                <h1>Dishes</h1>
                <SectionHeader title="Upcoming Dishes" />
                <div>
                    {thisWeeksDishes && thisWeeksDishes
                        .filter(menu => isDateXDaysFromToday(menu.menuDate, 0))
                        .map(menu => (
                            <div>
                                <div className="weeklyDishContainer">
                                    <div className="dishesRow">
                                        <p>{menu.dish?.dishName}</p>
                                        <p>{timeConverter(menu.menuDate)}</p>
                                        <p>{menu.cook?.fullName}</p>
                                    </div>
                                </div>
                                <div id={"form" + menu._id}>
                                    <button id={menu._id} onClick={fetchMenuList} className="sizeButtons">Generate</button>
                                    {
                                        getPdfListData &&
                                        <PDFDownloadLink
                                            document={<ListPdfDocument data={getPdfListData} />}
                                            fileName="list.pdf"
                                            className="sizeButtons">Download List</PDFDownloadLink>
                                    }
                                    {
                                        getPdfListData &&
                                        <PDFDownloadLink
                                            document={<LabelsPdfDocument data={getPdfListData} />}
                                            fileName="labels.pdf"
                                            className="sizeButtons">Download Labels</PDFDownloadLink>
                                    }
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
