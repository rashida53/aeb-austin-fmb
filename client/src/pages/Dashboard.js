import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { GET_ALL_COOKS, GET_ALL_MENUS, GET_ALL_SIGNUPS } from '../utils/queries';
import CookCard from '../components/CookCard';
import CookForm from '../components/CookForm';
import SignupForm from '../components/SignupForm';

const Dashboard = () => {

    const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
    let cooks = getCookData?.cooks || [];

    const { loading, data: menuData } = useQuery(GET_ALL_MENUS);
    let menus = menuData?.menus || [];

    const { loading: signupLoading, data: signupData } = useQuery(GET_ALL_SIGNUPS);
    let signups = signupData?.signups || [];


    console.log("menus", menus);
    console.log("signups", signups);


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

                            </div>
                        ))
                    }


                </div>

                <div>
                    {
                        signups && signups.map((signup) => (
                            <div>
                                <p>{signup.user.fullName}</p>
                                {/* <p>{signup.menuItem}</p> */}
                                <p>{signup.size}</p>
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