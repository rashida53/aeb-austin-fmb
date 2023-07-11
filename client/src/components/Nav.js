import { React, useState } from "react";
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
            maxWidth: '350px',
            marginTop: '0px',
            paddingTop: '60px',
            position: 'fixed',
            zIndex: 2,
            paddingLeft: '0px'
        },
    }

    return (
        <>
            <div className="navigation">
                <ul style={style.navigationLink}>
                    <li>
                        <Link to="/openMenus" style={{ textDecoration: "none", color: "white" }}><h3>Open signups</h3></Link>
                    </li>
                    <li>
                        <Link to="/mySignups" style={{ textDecoration: "none", color: "white" }}><h3>My Signups</h3></Link>
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

                <h3 className="header" style={{ position: 'relative', left: '50px' }}>Faiz-ul Mawaid-il Burhaniyah</h3>


            </div>

            <div className="navigationDesktop">
                <h3 className="navHeader">Faiz-ul Mawaid-il Burhaniyah</h3>
                <div className="navLinks">
                    <ul>
                        <li>
                            <Link to="/openMenus" style={{ textDecoration: "none", color: "white" }}><h3>Open Menus</h3></Link>
                        </li>
                        <li>
                            <Link to="/mySignups" style={{ textDecoration: "none", color: "white" }}><h3>My Signups</h3></Link>
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
                </div>
            </div>
        </>
    )
}