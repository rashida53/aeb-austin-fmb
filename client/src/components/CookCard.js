import React from "react";

const CookCard = (props) => {
    return (
        <>

            <div className="cookTile" key={props._id}>
                <p>{props.fullName}</p>
            </div>
        </>
    )
};

export default CookCard;