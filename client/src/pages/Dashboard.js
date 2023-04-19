import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { ADD_COOK, CREATE_SIGNUP } from '../utils/mutations';
import { GET_ALL_COOKS, GET_ALL_MENUS, GET_SINGLE_SIGNUP } from '../utils/queries';

const Dashboard = () => {

    const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
    let cooks = getCookData?.cooks || [];

    const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
    let menus = menuData?.menus || [];

    const { register, handleSubmit } = useForm();
    const [addCook, { error: cookError, data: addCookData }] = useMutation(ADD_COOK);

    const onCookSubmit = async (cookData, event) => {
        try {
            const { data } = await addCook({
                variables: {
                    fullName: cookData.fullName,
                },

            });
            console.log(data);

        } catch (err) {
            console.error(err);
        }
    }

    const { loading: signupLoading, data: getSignupData } = useQuery(GET_SINGLE_SIGNUP);
    let signups = getSignupData?.signups || [];

    const [createSignup, { error: signupError, data: createSignupData }] = useMutation(CREATE_SIGNUP);

        const onSizeSubmit = async (signupData, event) => {
            try {
                const { data } = await createSignup({
                    variables: {
                        // menuItem: signupData.menuItem._id,
                        size: signupData.size
                    }
                });
                console.log("signupData", signupData)
            } catch (err) {
                console.error(err);
            }
        }


    return (
        <>
            <nav>
                <h3>Dashboard</h3>
                <h3>Sign Out</h3>
            </nav>

            <section>
                <h1>Open Menus Available For Signup</h1>

                <div className="signupsTable">
                    {
                        menus && menus.map((menu) => (
                    <div className="signupsRow" key={menu._id}>
                        <p>✎</p>
                        <p>{menu.dish.dishName}</p>
                        <p>April 10</p>
                        <p>{menu.cook.fullName}</p>
                        <p>Size</p>

                <form onSubmit={handleSubmit(onSizeSubmit)}>
                    <input {...register("size")} type="radio" id="small" value="small"></input>
                    <label htmlFor="small">Small</label>

                    {/* <input {...register("size")} type="radio" id="Medium" value="Medium"></input>
                    <label htmlFor="Medium">Medium</label>

                    <input {...register("size")} type="radio" id="Large" value="Large"></input>
                    <label htmlFor="Large">Large</label> */}

                    <input type="submit" value="Create Signup" />

                </form>
                    </div>
                        ))
                    }

              
                </div>

            </section>

            <section>

                <h1>Cooks</h1>

                <ul>
                    {
                        cooks && cooks.map((cook) => (
                            <li key={cook._id}>
                                <p>{cook.fullName}</p>
                            </li>
                        ))
                    }

                </ul>

                <form onSubmit={handleSubmit(onCookSubmit)}>
                    <input {...register('fullName', { required: true })}
                        placeholder='Name'
                    ></input>

                    <input type="submit" value="Add cook" />
                </form>

            </section>

            <h1>Dishes</h1>
        </>
    )
};

export default Dashboard;