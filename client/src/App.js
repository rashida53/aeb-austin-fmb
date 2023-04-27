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

import Dashboard from "./pages/Dashboard";
import Dishes from "./pages/Dishes";
import Cook from "./pages/Cook";

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
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dishes" element={<Dishes />} />
            <Route path="/cook/:cookId" element={<Cook />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
