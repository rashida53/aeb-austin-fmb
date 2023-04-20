import React from "react";

const CookCard = (props) => {
    return (
        <>

            <li key={props._id}>
                <p>{props.fullName}</p>
            </li>
        </>
    )
};

export default CookCard;