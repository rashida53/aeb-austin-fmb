import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { ADD_COOK } from '../utils/mutations';

const CookForm = () => {

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

    return (
        <>
            <form onSubmit={handleSubmit(onCookSubmit)}>
                <input {...register('fullName', { required: true })} placeholder='Name'></input>
                <input type="submit" value="Add cook" />
            </form>
        </>
    )
};

export default CookForm;