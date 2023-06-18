import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { GET_SINGLE_COOK, GET_COOKS_MENU_ITEMS, GET_COOKS_MENU_ITEMS_BY_DATE, GET_COOKS_UNPAID_MENUS, GET_COOKS_PAID_MENUS } from "../utils/queries";
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { timeConverter } from '../utils/timeConverter';
import { MENU_PAID, RETURN_TO_PENDING } from '../utils/mutations';
import AddCostForm from '../components/AddCostForm';
import SectionHeader from '../components/SectionHeader';
import Nav from '../components/Nav';
import Header from '../components/Header';

const Cook = () => {
    const { cookId: cookParam } = useParams();

    const [unpaidMenus, setUnpaidMenus] = useState([]);

    const { loading, data } = useQuery(GET_SINGLE_COOK, { variables: { cookId: cookParam } })
    const cook = data?.cook || {};

    const { loading: cookItemsLoading, data: cookItemsData } = useQuery(GET_COOKS_MENU_ITEMS, { variables: { cookId: cookParam } });
    const cookMenus = cookItemsData?.cookMenuItems;

    const { loading: cookMenuItemsLoading, data: cookMenuItemsData } = useQuery(GET_COOKS_MENU_ITEMS_BY_DATE, { variables: { cookId: cookParam } });
    const cookMenuItems = cookMenuItemsData?.cookMenuItemsByDate;

    const { loading: cooksUnpaidMenusLoading, data: cooksUnpaidMenusData } = useQuery(GET_COOKS_UNPAID_MENUS, { variables: { cookId: cookParam } });
    const cooksUnpaidMenus = cooksUnpaidMenusData?.getCooksUnpaidMenus;
    console.log("cooks unpaid menus", cooksUnpaidMenus);

    useEffect(() => {
        if (!cooksUnpaidMenusLoading) {
            setUnpaidMenus(cooksUnpaidMenus);
        }
    }, [cooksUnpaidMenus]);

    const { loading: cooksPaidMenusLoading, data: cooksPaidMenusData } = useQuery(GET_COOKS_PAID_MENUS, { variables: { cookId: cookParam } });
    const cooksPaidMenus = cooksPaidMenusData?.getCooksPaidMenus;

    const [menuPaid] = useMutation(MENU_PAID);

    const [returnToPending] = useMutation(RETURN_TO_PENDING);

    const menuPaidButton = async (event) => {
        console.log(event);
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
    };

    const returnToPendingButton = async (event) => {
        try {
            const { data } = await returnToPending({
                variables: {
                    menuId: event.target.id
                }
            })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="navAndHeader">
                <Nav />
                <Header />
            </div>
            <h1>{cook.fullName}</h1>

            <SectionHeader title="Upcoming Dishes" />

            <div className="mainContainer">
                {cookMenuItems && cookMenuItems.map((cookMenu) => (
                    <div className="weeklyDishContainer">
                        <div className="dishesRow">
                            <p>{cookMenu.dish?.dishName}</p>
                            <p>{timeConverter(cookMenu.menuDate)}</p>
                        </div>

                    </div>

                ))}

                <SectionHeader title="Pending Payments" />
                {unpaidMenus && unpaidMenus.map((cookMenu) => (
                    <div className="weeklyDishContainer">
                        <div className="dishesRow">
                            <p>{cookMenu.dish?.dishName}</p>
                            <p>{timeConverter(cookMenu.menuDate)}</p>
                            {
                                cookMenu.amount &&
                                <div className='amountAndPaidButton'>
                                    <p style={{ fontWeight: "bold" }}>Total: ${cookMenu.amount}</p>
                                    <button className='menuPaidButton' onClick={menuPaidButton}>
                                        <p id={cookMenu._id}>Paid</p>
                                    </button>
                                </div>
                            }
                            {
                                !cookMenu.amount && <AddCostForm id={cookMenu._id} unpaidMenus={unpaidMenus} setUnpaidMenus={setUnpaidMenus} />
                            }
                        </div>
                    </div>
                ))}

                <SectionHeader title="Payment History" />
                {cooksPaidMenus && cooksPaidMenus.map((cookMenu) => (
                    <div className="weeklyDishContainer">
                        <div className="dishesRow">
                            <p>{cookMenu.dish?.dishName}</p>
                            <p>{timeConverter(cookMenu.menuDate)}</p>
                            <p style={{ fontWeight: "bold" }}>${cookMenu.amount}</p>
                            <button className='returnToPendingButton' onClick={returnToPendingButton}>
                                <p id={cookMenu._id}>Return to Pending</p>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )
}

export default Cook;