import React from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_SINGLE_COOK, GET_COOKS_MENU_ITEMS, GET_COOKS_MENU_ITEMS_BY_DATE, GET_COOKS_UNPAID_MENUS, GET_COOKS_PAID_MENUS } from "../utils/queries";
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { timeConverter } from '../utils/timeConverter';
import { MENU_PAID } from '../utils/mutations';
import AddCostForm from '../components/AddCostForm';

const Cook = () => {
    const { cookId: cookParam } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_COOK, { variables: { cookId: cookParam } })
    const cook = data?.cook || {};

    const { loading: cookItemsLoading, data: cookItemsData } = useQuery(GET_COOKS_MENU_ITEMS, { variables: { cookId: cookParam } });
    const cookMenus = cookItemsData?.cookMenuItems;

    const { loading: cookMenuItemsLoading, data: cookMenuItemsData } = useQuery(GET_COOKS_MENU_ITEMS_BY_DATE, { variables: { cookId: cookParam } });
    const cookMenuItems = cookMenuItemsData?.cookMenuItemsByDate;
    console.log(cookMenuItemsData);

    const { loading: cooksUnpaidMenusLoading, data: cooksUnpaidMenusData } = useQuery(GET_COOKS_UNPAID_MENUS, { variables: { cookId: cookParam } });
    const cooksUnpaidMenus = cooksUnpaidMenusData?.getCooksUnpaidMenus;

    const { loading: cooksPaidMenusLoading, data: cooksPaidMenusData } = useQuery(GET_COOKS_PAID_MENUS, { variables: { cookId: cookParam } });
    const cooksPaidMenus = cooksPaidMenusData?.getCooksPaidMenus;

    const [menuPaid] = useMutation(MENU_PAID);

    const menuPaidButton = async (event) => {
        try {
            const { data } = await menuPaid({
                variables: {
                    menuId: event.target.id,
                    isPaid: true
                },
            });
            window.location.reload(); 
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>{cook.fullName}</h1>

            <h1>This Week's Dishes</h1>

            <div className="mainContainer">
                {cookMenuItems && cookMenuItems.map((cookMenu) => (
                    <div className="weeklyDishContainer">
                        <div className="dishesRow">
                            <p>{cookMenu.dish.dishName}</p>
                            <p>{timeConverter(cookMenu.menuDate)}</p>
                        </div>

                    </div>

                ))}


                <div>
                    <h1>Pending Payments</h1>
                    {cooksUnpaidMenus && cooksUnpaidMenus.map((cookMenu) => (
                        <div className="weeklyDishContainer">
                            <div className="dishesRow">
                                <p>{cookMenu.dish.dishName}</p>
                                <p>{cookMenu.amount}</p>
                                <p>{timeConverter(cookMenu.menuDate)}</p>

                                <AddCostForm id={cookMenu._id} />
                                <button onClick={menuPaidButton} id={cookMenu._id}>Paid</button>
                            </div>

                        </div>
                    ))}
                </div>

                <div>
                    <h1>Payment History</h1>
                    {cooksPaidMenus && cooksPaidMenus.map((cookMenu) => (
                        <div className="weeklyDishContainer">
                            <div className="dishesRow">
                                <p>{cookMenu.dish.dishName}</p>
                                <p>{cookMenu.amount}</p>
                                <p>{timeConverter(cookMenu.menuDate)}</p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Cook;