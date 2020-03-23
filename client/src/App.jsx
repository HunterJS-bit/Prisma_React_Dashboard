import React from 'react';
import Home from './components/Home';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import { createUploadLink } from 'apollo-upload-client';
import './App.css';

const link = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AppProvider>
          <div className="App">
            <Home />
          </div>
        </AppProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
