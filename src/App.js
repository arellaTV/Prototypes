import React, { Component } from 'react';
import Prototype from './Game/Prototype01';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-header__title">HOLD THE DOOR</h1>
          <p className="App-header__subtitle"><em>Order your employees to hold the door for each other!</em></p>
        </div>
        <Prototype />
      </div>
    );
  }
}

export default App;
