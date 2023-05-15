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

            <div className='mainContainer'>

                <div className='logo'>

                </div>

                <div className='loginForm'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor='email'>Email</label>
                        <input {...register("email", { required: true })}
                        />
                        <label htmlFor='password'>Password</label>
                        <input type="password" {...register("password", { required: true })}
                        />

                        <div className='loginButton'>

                            <button type="submit"><h3>Log In</h3></button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
};

export default Login;