import React from "react";

export default function Hamburger({ isOpen }) {
    return (
        <>
            <div className="hamburger">
                <div className="burger burger1"></div>
                <div className="burger burger2"></div>
                <div className="burger burger3"></div>
            </div>

            <style jsx="true">{`
                .hamburger{
                    width: 2rem;
                    height: 2rem;
                    display: none;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    z-index: 10;
                }

                .burger{
                    width: 2rem;
                    height: 0.25rem;
                    border-radius: 10px;
                    background-color: 'black';
                    transform-origin: 1;
                    transition: all 0.3s linear;
                }

                .burger1{
                    transform: ${isOpen ? 'rotate(45deg)' : 'rotate(0)'};
                }
                .burger2{
                    transform: ${isOpen ? 'translateX(100%)' : 'translateX(0)'};
                    opacity: ${isOpen ? 0 : 1};
                }
                .burger3{
                    transform: ${isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                }

                @media (max-width: 1258px) {
                    .hamburger {
                      display: flex;
                      padding-top: 10px;
                      margin-left: 10px;
                      z-index: 10;
                  
                    }
                  }

                
            `}</style>
        </>
    )
}