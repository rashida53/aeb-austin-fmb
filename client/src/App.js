import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";

import UserSignups from "./pages/UserSignups";
import Dishes from "./pages/Dishes";
import Cook from "./pages/Cook";
import Login from "./pages/Login";
import Cooks from './pages/Cooks'
import OpenSignups from "./pages/OpenSignups";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// SETTING UP THE CONTEXT
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Routes>
            <Route
              exact path='/'
              element={<Login />}
            />
            <Route path='/login' element={<Login />} />
            <Route exact path="/openMenus" element={<OpenSignups />} />
            <Route exact path="/mySignups" element={<UserSignups />} />
            <Route exact path="/dishes" element={<Dishes />} />
            <Route path="/cooks/" element={<Cooks />} />
            <Route path="/cook/:cookId" element={<Cook />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
