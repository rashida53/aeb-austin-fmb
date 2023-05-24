import React from "react";
import { useState } from "react";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";

export default function Nav() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    const style = {
        navigationLink: {
            display: `${hamburgerOpen ? 'inline' : 'none'}`,
            backgroundColor: '#A4800F',
            height: '100vh',
            width: '45vw',
            marginTop: '0px',
            paddingTop: '60px',
            position: 'absolute',
            zIndex: 2

        }
    }

    return (
        <>
            <div className="navigation">
                <ul style={style.navigationLink}>
                    <li>
                        <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}><h3>Dashboard</h3></Link>
                    </li>
                    <li>
                        <Link to="/dishes" style={{ textDecoration: "none", color: "white" }}><h3>Dishes</h3></Link>
                    </li>
                    <li>
                        <Link to="/cooks" style={{ textDecoration: "none", color: "white" }}><h3>Cooks</h3></Link>
                    </li>
                    <li>
                        <Link to="#" style={{ textDecoration: "none", color: "white" }}><h3>Sign Out</h3></Link>
                    </li>
                </ul>

                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>
            </div>
        </>
    )
}