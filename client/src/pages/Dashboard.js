import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  GET_ALL_COOKS,
  GET_ALL_MENUS,
  GET_ALL_SIGNUPS,
  GET_OPEN_MENUS
} from "../utils/queries";
import CookForm from "../components/CookForm";
import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";
import { timeConverter } from "../utils/timeConverter";

const Dashboard = () => {
  const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
  let cooks = getCookData?.cooks || [];

  const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
  let menus = menuData?.menus || [];
  console.log("menus", menus)

  const { loading: openMenuLoading, data: openMenuData } = useQuery(GET_OPEN_MENUS);
  let openMenus = openMenuData?.openMenus || [];

  const { loading: signupLoading, data: signupData } =
    useQuery(GET_ALL_SIGNUPS);
  let signups = signupData?.signups || [];

  console.log("menus", menus);
  console.log("signups", signups);

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
    <div className="mainContainer">
      <nav>
        <h3>Dashboard</h3>
        <h3>Sign Out</h3>
      </nav>

      <h1>Open Menus Available For Signup</h1>

      <div className="signupsTable">
        {openMenus &&
          openMenus.map((menu) => (
            <div className="signup">
              <div className="signupsRow" key={menu._id}>
                <p id={menu._id} className="createSignupPencil" onClick={showSignupForm}>
                  ✎
                </p>
                <p>{menu.dish?.dishName}</p>
                <p>{timeConverter(menu.menuDate)}</p>
                <p>{menu.cook?.fullName}</p>
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
                <p>Monday</p>
                <p>{signup.menuItem?.dish?.dishName}</p>
                <p>{signup.size}</p>
              </ul>
            </div>
          ))}
      </div>

      <h1>Cooks</h1>

      <div className="cookTiles">
        {cooks &&
          cooks.map((cook) => (
            <Link to={`/cook/${cook._id}`}>
              <div className="cookTile" key={cook._id}>
                <p>{cook.fullName}</p>
              </div>
            </Link>
          ))}
        <div className="cookTile">
          <p className="addCookPlus" onClick={showAddCook}>
            +
          </p>
        </div>

      </div>
      <div>
        <CookForm />
      </div>

      <Link to="/dishes">
        <h1 className="dishes">Dishes</h1>
      </Link>
    </div>
  );
};

export default Dashboard;
