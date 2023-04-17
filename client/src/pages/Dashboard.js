import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { ADD_COOK } from '../utils/mutations';
import { GET_ALL_COOKS } from '../utils/queries';

const Dashboard = () => {

    const { loading, data: cookData } = useQuery(GET_ALL_COOKS);
    let cooks = cookData?.cooks || []

    const { register, handleSubmit } = useForm();
    const [addCook, { error, data }] = useMutation(ADD_COOK);

    const onSubmit = async (cookData, event) => {
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


    return (
        <>
            <nav>
                <h3>Dashboard</h3>
                <h3>Sign Out</h3>
            </nav>

            <section>
                <h1>Menu</h1>
                <h2>Open Signups</h2>

                <div className="signupsTable">
                    <div className="signupsRow">
                        <p>✎</p>
                        <p>Dish 1</p>
                        <p>April 10</p>
                        <p>Cook 1</p>
                    </div>

                    <div className="signupsRow">
                        <p>✎</p>
                        <p>Dish 2</p>
                        <p>April 12</p>
                        <p>Cook 2</p>
                    </div>

                    <div className="signupsRow">
                        <p>✎</p>
                        <p>Dish 3</p>
                        <p>April 14</p>
                        <p>Cook 3</p>
                    </div>

                    <div className="signupsRow">
                        <p>✎</p>
                        <p>Dish 4</p>
                        <p>April 16</p>
                        <p>Cook 1</p>
                    </div>

                    <div className="signupsRow">
                        <p>✎</p>
                        <p>Dish 5</p>
                        <p>April 18</p>
                        <p>Cook 2</p>
                    </div>
                </div>

                <h2>Signup Form</h2>

                <form>
                    <input type="radio" id="small" name="small" value="small"></input>
                    <label htmlFor="small">Small</label>

                    <input type="radio" id="Medium" name="Medium" value="Medium"></input>
                    <label htmlFor="Medium">Medium</label>

                    <input type="radio" id="Large" name="Large" value="Large"></input>
                    <label htmlFor="Large">Large</label>

                    <button type="submit">Submit</button>

                </form>
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

                <form onSubmit={handleSubmit(onSubmit)}>
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