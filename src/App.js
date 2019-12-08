import React from 'react';
import Home from './components/Home';
import Header from './components/common/Header';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Home />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
