import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_COOKS,
  GET_ALL_MENUS,
  GET_USER_SIGNUPS,
  GET_OPEN_MENUS,
} from "../utils/queries";
import { DELETE_SIGNUP } from "../utils/mutations";
import SignupForm from "../components/SignupForm";
import { timeConverter } from "../utils/timeConverter";
import Auth from "../utils/auth";
import { Navigate, Link } from "react-router-dom";
import Header from "../components/Header";
import SectionHeader from "../components/SectionHeader";
import Nav from "../components/Nav";

const Dashboard = () => {
  const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
  let cooks = getCookData?.cooks || [];

  const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
  let menus = menuData?.menus || [];

  const { loading: openMenuLoading, data: openMenuData } =
    useQuery(GET_OPEN_MENUS);
  const { loading: signupLoading, data: signupData } =
    useQuery(GET_USER_SIGNUPS);

  const [deleteSignup] = useMutation(DELETE_SIGNUP);

  const isDateFourDaysFromToday = (date) => {
    var today = new Date();
    today.setDate(today.getDate() + 4);
    var fourDaysFromToday = new Date(today);
    return new Date(parseFloat(date)) >= fourDaysFromToday;
  };

  const onDeleteClick = async (event) => {
    try {
      const { data } = await deleteSignup({
        variables: {
          signupId: event.target.id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  let signups = signupData?.userSignups || [];
  let filteredSignups = signups.filter(
    (signup) => new Date(parseFloat(signup?.menuItem?.menuDate)) >= new Date()
  );

  const getFilteredMenus = (openMenuData, signupData) => {
    let openMenus = openMenuData?.openMenus || [];
    let filteredOpenMenus = openMenus.filter((openMenu) =>
      isDateFourDaysFromToday(openMenu.menuDate)
    );

    let signups = signupData?.userSignups || [];
    let menusSignedUp = signups.map((signup) => signup?.menuItem?._id);

    return filteredOpenMenus.filter(
      (menu) => !menusSignedUp.includes(menu._id)
    );
  };

  let openMenus = getFilteredMenus(openMenuData, signupData);

  const showSignupForm = (event) => {
    hideAllForms();
    const signupForm = document.getElementById("form" + event.target.id);
    signupForm.style.visibility = "visible";
  };

  function hideAllForms() {
    var allSignupDivs = document.getElementsByClassName("signupForm");
    if (allSignupDivs.length > 0) {
      for (var i = 0; i < allSignupDivs.length; i++) {
        allSignupDivs[i].style.visibility = "hidden";
      }
    }
  }

  return (
    <>
      {/* {!Auth.loggedIn() && <Navigate to="/login" />} */}

      <div className="navAndHeader">
        <Nav />
        <Header />
      </div>

      <h1>Dashboard</h1>

      <div className="mainContainer">
        <SectionHeader title="Open Signups" />

        <div className="signupsTable">
          {openMenus &&
            openMenus.map((menu) => (
              <div className="signup">
                <div className="signupsRow" key={menu._id}>
                  <div className="openSignupInfo">
                    <p>{menu.dish?.dishName}</p>
                    <p>{timeConverter(menu.menuDate)}</p>
                    <p>{menu.cook?.fullName}</p>
                  </div>

                  <div className="addButtonAndPhoto">
                    <div className="addButton">
                      <p
                        id={menu._id}
                        className="addSignupPlus"
                        onClick={showSignupForm}
                      >
                        +
                      </p>
                    </div>

                    <div className="dishPhotoContainer">
                      <img
                        className="dishPhoto"
                        src="https://www.seriouseats.com/thmb/tuMCogfAOy2zNdVqE7ydUwuru9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-vegetable-fried-rice-recipe-hero-2-fed2a62b8bce4c51b945d9c24c2edb68.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div id={"form" + menu._id} className="signupForm">
                  <SignupForm id={menu._id} />
                </div>
              </div>
            ))}
        </div>

        <SectionHeader title="Your Signups" />

        <div className="signupsContainer">
          {filteredSignups &&
            filteredSignups.map((signup) => (
              <div className="signup">
                <div className="yourSignups">
                  <div className="yourSignupInfo">
                    <p>{timeConverter(signup.menuItem.menuDate)}</p>
                    <p>{signup.menuItem?.dish?.dishName}</p>
                    <p>{signup.size}</p>
                  </div>
                  <div className="buttonAndPhoto">
                    <div className="editButton">
                      <p
                        style={
                          isDateFourDaysFromToday(signup.menuItem.menuDate)
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        id={signup.menuItem._id}
                        onClick={showSignupForm}
                        className="editButtonText"
                      >
                        Edit
                      </p>
                    </div>
                    <div className="cancelButton">
                      <p
                        style={
                          isDateFourDaysFromToday(signup.menuItem.menuDate)
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        id={signup._id}
                        onClick={onDeleteClick}
                        className="cancelButtonText"
                      >
                        Cancel
                      </p>
                    </div>

                    <div className="dishPhotoContainer">
                      <img
                        className="dishPhoto"
                        src="https://www.seriouseats.com/thmb/tuMCogfAOy2zNdVqE7ydUwuru9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-vegetable-fried-rice-recipe-hero-2-fed2a62b8bce4c51b945d9c24c2edb68.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div id={"form" + signup.menuItem._id} className="signupForm">
                  <SignupForm id={signup.menuItem._id} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
