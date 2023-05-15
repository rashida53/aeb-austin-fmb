import React from 'react';
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_ALL_COOKS
} from '../utils/queries'
import CookForm from '../components/CookForm'
import Header from '../components/Header';
import { Link } from "react-router-dom";
import { timeConverter } from "../utils/timeConverter";

const Cooks = () => {
  const { loading: cookLoading, data: getCookData } = useQuery(GET_ALL_COOKS);
  let cooks = getCookData?.cooks || [];

  const showAddCook = () => {
    const cookForm = document.querySelector(".cookForm");
    cookForm.style.visibility = "visible";
  };

  return (
    <>
      <Header />
      <nav>
        <h3>Dashboard</h3>
        <h3>Sign Out</h3>
      </nav>

      <h1>Cooks</h1>

      <div className="cookTiles">
        {cooks &&
          cooks.map((cook) => (
            <Link to={`/cook/${cook._id}`}>
              <div className="cookTile" key={cook._id}>
                <p>{cook.fullName}</p>
              </div>
            </Link>
          ))}
        <div className="cookTile">
          <p className="addCookPlus" onClick={showAddCook}>
            +
          </p>
        </div>

      </div>
      <div>
        <CookForm />
      </div>

    </>
  )


}

export default Cooks;