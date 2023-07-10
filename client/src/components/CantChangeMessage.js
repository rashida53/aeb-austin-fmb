import React from "react";

const CantChangeMessage = (props) => {
    return (
        <>
            <p id={props.id} className={props.className} style={props.style}>{props.message}</p>
        </>
    )
};

export default CantChangeMessage;