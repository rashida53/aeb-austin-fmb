import React from 'react';
import { useQuery } from '@apollo/client'
import { GET_SINGLE_COOK } from "../utils/queries";
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const Cook = () => {
    const { cookId: cookParam } = useParams();
    const { loading, data } = useQuery(GET_SINGLE_COOK, { variables: { cookId: cookParam }})
    const cook = data?.cook || {};
console.log("cook", cook)
    return (
        <>
        <h1>{cook.fullName}</h1>
        </>
    )
}

export default Cook;