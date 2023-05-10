import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  GET_ALL_COOKS,
  GET_ALL_MENUS,
  GET_ALL_SIGNUPS,
  GET_USER_SIGNUPS,
  GET_OPEN_MENUS,
  GET_ME
} from "../utils/queries";
import CookForm from "../components/CookForm";
import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";
import { timeConverter } from "../utils/timeConverter";
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import SectionHeader from "../components/SectionHeader";

const Dashboard = () => {
  const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
  let cooks = getCookData?.cooks || [];

  const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
  let menus = menuData?.menus || [];

  const { loading: openMenuLoading, data: openMenuData } = useQuery(GET_OPEN_MENUS);
  let openMenus = openMenuData?.openMenus || [];

  const { loading: signupLoading, data: signupData } = useQuery(GET_USER_SIGNUPS);
  let signups = signupData?.userSignups || [];

  console.log("user signups", signups)

  const showAddCook = () => {
    const cookForm = document.querySelector(".cookForm");
    cookForm.style.visibility = "visible";
  };

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
  };

  return (
    <>
      {!Auth.loggedIn() && <Navigate to='/login' />}
      <div className="mainContainer">
        <Header />
        <nav>
          <h3>Dashboard</h3>
          <h3>Cooks</h3>
          <h3>Sign Out</h3>
        </nav>

        <SectionHeader title="Open Signups" />

        <div className="signupsTable">
          {openMenus &&
            openMenus.map((menu) => (
              <div className="signup">
                <div className="signupsRow" key={menu._id}>
                  <div className="addButton">
                    <p id={menu._id} className="createSignupPencil" onClick={showSignupForm}>
                      +
                    </p>
                  </div>
                  <div className="openSignupInfo">
                    <p>{menu.dish?.dishName}</p>
                    <p>{timeConverter(menu.menuDate)}</p>
                    <p>{menu.cook?.fullName}</p>
                  </div>
                </div>
                <div id={"form" + menu._id} className="signupForm">
                  <SignupForm id={menu._id} />
                </div>
              </div>
            ))}
        </div>

        <h1>Your Signups</h1>

        <div className="signupsContainer">
          {signups &&
            signups.map((signup) => (
              <div>
                <ul>
                  <li>{signup.user.fullName}</li>
                  <p>{timeConverter(signup.menuItem.menuDate)}</p>
                  <p>{signup.menuItem?.dish?.dishName}</p>
                  <p>{signup.size}</p>
                </ul>
              </div>
            ))}
        </div>



        <Link to="/dishes">
          <h1 className="dishes">Dishes</h1>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
