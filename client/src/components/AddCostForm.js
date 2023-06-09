import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ADD_COST } from '../utils/mutations';

const AddCostForm = (props, { unpaidMenus, setUnpaidMenus }) => {
    const { register, handleSubmit } = useForm();

    const [addCost] = useMutation(ADD_COST);

    const onCostSubmit = async (costData, event) => {
        const amount = parseFloat(costData.amount);
        try {
            const { data } = await addCost({
                variables: {
                    menuId: event.target.id,
                    amount: amount
                },
            });
            unpaidMenus = [...unpaidMenus, costData];
            setUnpaidMenus(unpaidMenus);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form className="addCostForm" onSubmit={handleSubmit(onCostSubmit)} id={props.id} >
                <input {...register("amount", { required: true })} placeholder="Amount"></input>
                <input type="submit" value="Add Cost"></input>
            </form>
        </>
    )
};

export default AddCostForm;