import React, { Component } from 'react';

import './App.css';

import MainPage from './Pages/MainPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>Neighbourhood App</header>
        <MainPage />
      </div>
    );
  }
}

export default App;
