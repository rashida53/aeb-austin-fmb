import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// SETTING UP THE CONTEXT
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
              element={<Home />}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
