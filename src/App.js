import React from 'react';
import Home from './components/Home';
import Header from './components/common/Header';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
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
