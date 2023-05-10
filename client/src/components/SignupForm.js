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

    console.log("me", me)


    const onSizeSubmit = async (signupData, event) => {
        try {
            const { data } = await createSignup({
                variables: {
                    menuItem: event.target.id,
                    user: me._id,
                    size: signupData.size,
                },
            });
            const signupForm = document.querySelector(".signupForm");
            signupForm.style.visibility = "hidden";
            console.log("signupData", data);
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form
                id={props.id}
                onSubmit={handleSubmit(onSizeSubmit)}
                className="signupInputs"
            >
                <div className="sizeOption">
                    <input
                        {...register("size", { required: true })}
                        type="radio"
                        id="Small"
                        value="Small"
                    ></input>
                    <label htmlFor="Small">Small</label>
                </div>

                <div className="sizeOption">
                    <input
                        {...register("size", { required: true })}
                        type="radio"
                        id="Large"
                        value="Large"
                    ></input>
                    <label htmlFor="Large">Large</label>
                </div>
                <input type="submit" value="Create Signup" />
            </form>
        </>
    );
};

export default SignupForm;
