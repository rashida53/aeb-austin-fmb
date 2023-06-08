import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import {
  GET_ALL_COOKS
} from '../utils/queries'
import CookForm from '../components/CookForm'
import Header from '../components/Header';
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

const Cooks = () => {
  const [cooks, setCook] = useState([]);

  const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
  let cookData = getCookData?.cooks || [];

  const showAddCook = () => {
    const cookForm = document.querySelector(".cookForm");
    cookForm.style.visibility = "visible";
  };

  useEffect(() => {
    if (!cookLoading) {
      setCook(cookData);
    }
  }, [cookData]);

  return (
    <>

      <div className="navAndHeader">
        <Nav />
        <Header />
      </div>

      <h1>Cooks</h1>

      <div className="cookTiles">
        {cooks &&
          cooks.map((cook) => (
            <Link to={`/cook/${cook._id}`} style={{ textDecoration: "none" }}>
              <div className="cookTile" key={cook._id}>
                <p>{cook.fullName}</p>
              </div>
            </Link>
          ))}
        <div className="cookTile">
          <p id="addCookPlus" onClick={showAddCook}>
            +
          </p>
        </div>

      </div>
      <div>
        <CookForm cooks={cooks} setCook={setCook} />
      </div>

    </>
  )


}

export default Cooks;