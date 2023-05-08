import React from "react";
import Auth from "../utils/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Navigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [login] = useMutation(LOGIN_USER);

    const onSubmit = async (formData, event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formData },
            });
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {Auth.loggedIn() && <Navigate to="/dashboard" />}

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email", { required: true })} placeholder="Email"
                />
                <input type="password" {...register("password", { required: true })} placeholder="Password"
                />
                <button type="submit">Log In</button>
            </form>
        </>
    )
};

export default Login;