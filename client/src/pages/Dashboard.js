import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { GET_ALL_COOKS, GET_ALL_MENUS, GET_SINGLE_SIGNUP } from '../utils/queries';
import CookCard from '../components/CookCard';
import CookForm from '../components/CookForm';
import SignupForm from '../components/SignupForm';

const Dashboard = () => {

    const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
    let cooks = getCookData?.cooks || [];

    const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
    let menus = menuData?.menus || [];

    // const { loading: signupLoading, data: getSignupData } = useQuery(GET_SINGLE_SIGNUP);
    // let signups = getSignupData?.signups || [];

    // const [createSignup, { error: signupError, data: createSignupData }] = useMutation(CREATE_SIGNUP);
    // const onSizeSubmit = async (signupData, event) => {
    //     console.log(event);
    //     try {
    //         const { data } = await createSignup({
    //             variables: {
    //                 menuItem: event.target.id,
    //                 user: '64398b289c7e0365b67d0b49',
    //                 size: signupData.size
    //             }
    //         });
    //         console.log("signupData", data)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }


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

                                <SignupForm id={menu._id} />

                                {/* <form id={menu._id} onSubmit={handleSubmit(onSizeSubmit)}>
                                    <input {...register("size", { required: true })} type="radio" id="Small" value="Small"></input>
                                    <label htmlFor="Small">Small</label>

                                    <input {...register("size", { required: true })} type="radio" id="Medium" value="Medium"></input>
                                    <label htmlFor="Medium">Medium</label>

                                    <input {...register("size", { required: true })} type="radio" id="Large" value="Large"></input>
                                    <label htmlFor="Large">Large</label>

                                    <input type="submit" value="Create Signup" />

                                </form> */}
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
                            (< CookCard key={cook._id} fullName={cook.fullName} />)
                        ))

                    }

                </ul>

                <CookForm />


            </section>

            <h1>Dishes</h1>
        </>
    )
};

export default Dashboard;