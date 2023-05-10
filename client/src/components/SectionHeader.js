import React from "react";

const SectionHeader = (props) => {
    return (
        <>
            <div className="sectionHeader">
                <h2>{props.title}</h2>
            </div>
        </>
    )
};

export default SectionHeader;