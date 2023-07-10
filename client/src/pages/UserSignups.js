import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_USER_SIGNUPS } from "../utils/queries";
import { CREATE_SIGNUP, DELETE_SIGNUP } from "../utils/mutations";
import { isDateXDaysFromToday, showSignupForm, timeConverter, showEditMessage, showCancelMessage } from "../utils/timeConverter";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { useForm } from "react-hook-form";
import DishPhotoCard from "../components/DishPhotoCard";
import CantChangeMessage from "../components/CantChangeMessage";

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
        <h1>Your Signups</h1>
        <div className="signupsContainer">
          {
            userSignups && userSignups
              .filter(signup => isDateXDaysFromToday(signup.menuItem?.menuDate, 0))
              .map(signup => (
                <div key={signup._id} className="userSignup">
                  <div className="signupsRow">
                    <div className="yourSignupInfo">
                      <p>{timeConverter(signup.menuItem.menuDate)}</p>
                      <p>{signup.menuItem?.dish?.dishName}</p>
                      <p>{signup.size}</p>
                    </div>
                    <div className="buttonAndPhoto">

                      {
                        isDateXDaysFromToday(signup.menuItem.menuDate, 4) &&
                        <div className="editButton">
                          <p id={signup.menuItem._id} onClick={showSignupForm} className="editButtonText">Edit</p>
                        </div>
                      }
                      {
                        !isDateXDaysFromToday(signup.menuItem.menuDate, 4) &&
                        <div className="editButton" style={{ backgroundColor: '#DDC798', color: '#E6DBC9' }}>
                          <p id={signup.menuItem._id} className="editButtonText">Edit</p>
                        </div>
                      }




                      {
                        isDateXDaysFromToday(signup.menuItem.menuDate, 4) &&
                        <div className="cancelButton">
                          <p id={signup._id} onClick={onDeleteClick} className="cancelButtonText">Cancel</p>
                        </div>
                      }

                      {
                        !isDateXDaysFromToday(signup.menuItem.menuDate, 4) &&
                        <div className="cancelButton" style={{ backgroundColor: '#DDC798', color: '#E6DBC9' }}>
                          <p id={signup._id} className="cancelButtonText">Cancel</p>
                        </div>
                      }

                      <div className="dishPhotoContainer">
                        <DishPhotoCard image={signup.menuItem?.dish?.dishPhoto} />
                      </div>
                    </div>
                    <CantChangeMessage id={"edit" + signup.menuItem._id} className={"cantEditMessage"} style={{ visibility: 'hidden' }} message={"You can't edit now"} />
                    <CantChangeMessage id={"cancel" + signup._id} className={"cantCancelMessage"} style={{ visibility: 'hidden' }} message={"You can't cancel now"} />
                    {/* <p id={"cancel" + signup._id} className="cantCancelMessage" style={{ visibility: 'hidden' }}>You can't cancel now</p> */}
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
