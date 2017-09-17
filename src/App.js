import React, { Component } from 'react';
import Prototype02 from './Game/Prototype02';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.loader = window.PIXI.loader;
    this.loader.add('scott_pilgrim_walking_01', 'assets/sprites/scott_pilgrim_walking_01.json');
    this.loader.add('scott_pilgrim_idle_01', 'assets/sprites/scott_pilgrim_idle_01.json');
    this.loader.add('door_01', 'assets/sprites/door_01.json');
    this.loader.load();
    this.state = {
      isLoadComplete: false,
    }
  }

  componentDidMount() {
    this.loader.onComplete.add(() => {
      this.setState({
        isLoadComplete: true,
      });
    });
  }

  render() {
    if (!this.state.isLoadComplete) {
      return null;
    }
    return (
      <Prototype02 />
    );
  }
}

export default App;
