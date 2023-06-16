import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_USER_SIGNUPS } from "../utils/queries";
import { CREATE_SIGNUP, DELETE_SIGNUP } from "../utils/mutations";
import { isDateXDaysFromToday, showSignupForm, timeConverter } from "../utils/timeConverter";
import Header from "../components/Header";
import SectionHeader from "../components/SectionHeader";
import Nav from "../components/Nav";
import { useForm } from "react-hook-form";

const UserSignups = () => {

  const [userSignups, setUserSignups] = useState([]);

  const { loading: userSignupsLoading, data: getUserSignupsData, refetch } = useQuery(GET_USER_SIGNUPS);
  let userSignupsData = getUserSignupsData?.userSignups || [];

  useEffect(() => {
    if (!userSignupsLoading) {
      setUserSignups(userSignupsData);
    }
  }, [userSignupsData]);

  const [deleteSignup] = useMutation(DELETE_SIGNUP);

  const onDeleteClick = async (event) => {
    try {
      const { data } = await deleteSignup({
        variables: {
          signupId: event.target.id,
        },
      });
      const refetchedData = await refetch();
      setUserSignups(refetchedData.data.userSignups);
    } catch (err) {
      console.error(err);
    }
  };

  const { register, handleSubmit } = useForm();
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
      const refetchedData = await refetch();
      setUserSignups(refetchedData.data.userSignups);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* {!Auth.loggedIn() && <Navigate to="/login" />} */}
      <div className="navAndHeader">
        <Nav />
        <Header />
      </div>
      <div className="mainContainer">
        <SectionHeader title="Your Signups" />
        <div className="signupsContainer">
          {
            userSignups && userSignups
              .filter(signup => isDateXDaysFromToday(signup.menuItem.menuDate, 0))
              .map(signup => (
                <div key={signup._id} className="signup">
                  <div className="yourSignups">
                    <div className="yourSignupInfo">
                      <p>{timeConverter(signup.menuItem.menuDate)}</p>
                      <p>{signup.menuItem?.dish?.dishName}</p>
                      <p>{signup.size}</p>
                    </div>
                    <div className="buttonAndPhoto">
                      <div className="editButton">
                        {
                          isDateXDaysFromToday(signup.menuItem.menuDate, 4) &&
                          <p id={signup.menuItem._id} onClick={showSignupForm} className="editButtonText">Edit</p>
                        }
                      </div>
                      <div className="cancelButton">
                        {
                          isDateXDaysFromToday(signup.menuItem.menuDate, 4) &&
                          <p id={signup._id} onClick={onDeleteClick} className="cancelButtonText">Cancel</p>
                        }
                      </div>
                      <div className="dishPhotoContainer">
                        <img className="dishPhoto" src="https://www.seriouseats.com/thmb/tuMCogfAOy2zNdVqE7ydUwuru9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-vegetable-fried-rice-recipe-hero-2-fed2a62b8bce4c51b945d9c24c2edb68.jpg" />
                      </div>
                    </div>
                  </div>
                  <div id={"form" + signup.menuItem._id} className="signupForm">
                    <button id={signup.menuItem._id} onClick={onSubmit} value="Small" className="sizeButtons">Small</button>
                    <button id={signup.menuItem._id} onClick={onSubmit} value="Large" className="sizeButtons">Large</button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default UserSignups;
