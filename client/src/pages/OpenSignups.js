import {showSignupForm, timeConverter} from "../utils/timeConverter";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ME, GET_OPEN_MENUS, GET_USER_SIGNUPS} from "../utils/queries";
import SectionHeader from "../components/SectionHeader";
import Nav from "../components/Nav";
import Header from "../components/Header";
import {CREATE_SIGNUP} from "../utils/mutations";

const OpenSignups = () => {

    const [openSignups, setOpenSignups] = useState([]);

    const { loading: openMenusLoading, data: getOpenMenusData } = useQuery(GET_OPEN_MENUS);
    let openMenusData = getOpenMenusData?.openMenus || [];

    const { loading: userSignupsLoading, data: getUserSignupsData, refetch } = useQuery(GET_USER_SIGNUPS);
    let userSignupsData = getUserSignupsData?.userSignups || [];

    useEffect(() => {
        if (!openMenusLoading && !userSignupsLoading) {
            let signedUpMenus = userSignupsData?.map(signup => signup.menuItem._id);
            let openMenusNotSignedUp = openMenusData.filter(openMenu => !signedUpMenus.includes(openMenu._id));
            setOpenSignups(openMenusNotSignedUp);
        }
    }, [openMenusData, userSignupsData]);

    const [createSignup] = useMutation(CREATE_SIGNUP);

    const { loading, data } = useQuery(GET_ME);
    const me = data?.me;

    const onSubmit = async (event) => {
        try {
            const { data } = await createSignup({
                variables: {
                    menuItem: event.target.id,
                    user: me._id,
                    size: event.target.value,
                },
            });
            let updatedMenusNotSignedUp = openSignups.filter(openSignup => openSignup._id!==data.createSignup.menuItem._id)
            setOpenSignups(updatedMenusNotSignedUp);
            refetch();
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
            <div className="mainContainer">
                <SectionHeader title="Open Menus" />
                <div className="signupsContainer">
                    {
                        openSignups && openSignups
                        .map(menu => (
                        <div key={menu._id} className="signup">
                            <div className="signupsRow" key={menu._id}>
                                <div className="openSignupInfo">
                                    <p>{menu.dish?.dishName}</p>
                                    <p>{timeConverter(menu.menuDate)}</p>
                                    <p>{menu.cook?.fullName}</p>
                                </div>
                                <div className="addButtonAndPhoto">
                                    <div className="addButton">
                                        <p id={menu._id} className="addSignupPlus" onClick={showSignupForm}>+</p>
                                    </div>
                                    <div className="dishPhotoContainer">
                                        <img className="dishPhoto" src="https://www.seriouseats.com/thmb/tuMCogfAOy2zNdVqE7ydUwuru9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-vegetable-fried-rice-recipe-hero-2-fed2a62b8bce4c51b945d9c24c2edb68.jpg"/>
                                    </div>
                                </div>
                            </div>
                            <div id={"form" + menu._id} className="signupForm">
                                <button id={menu._id} onClick={onSubmit} value="Small" className="sizeButtons">Small</button>
                                <button id={menu._id} onClick={onSubmit} value="Large" className="sizeButtons">Large</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default OpenSignups;