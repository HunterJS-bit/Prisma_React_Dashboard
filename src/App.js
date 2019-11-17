import React from 'react';
import Home from './components/Home';
import Header from './components/common/Header';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
