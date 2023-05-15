import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_SIGNUP } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

const SignupForm = (props) => {
    const { register, handleSubmit } = useForm();
    const [createSignup, { error: signupError, data: createSignupData }] =
        useMutation(CREATE_SIGNUP);

    const { loading, data } = useQuery(GET_ME);
    const me = data?.me;

    const onSmallSubmit = async (event) => {
        console.log(event.target);
        try {
            const { data } = await createSignup({
                variables: {
                    menuItem: event.target.id,
                    user: me._id,
                    size: "Small",
                },
            });
            const signupForm = document.querySelector(".signupForm");
            signupForm.style.visibility = "hidden";

        } catch (err) {
            console.error(err);
        }
    };

    const onLargeSubmit = async (event) => {
        console.log(event.target);
        try {
            const { data } = await createSignup({
                variables: {
                    menuItem: event.target.id,
                    user: me._id,
                    size: "Large",
                },
            });
            const signupForm = document.querySelector(".signupForm");
            signupForm.style.visibility = "hidden";

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <button id={props.id} onClick={onSmallSubmit} className="sizeButtons">Small</button>
            <button id={props.id} onClick={onLargeSubmit} className="sizeButtons">Large</button>
        </>
    );
};

export default SignupForm;
