import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as PIXI from 'pixi.js';
import ReactPIXI from 'react-pixi';

const assetpath = filename => `./assets/sprites/${filename}`;

const Stage = ReactPIXI.Stage;
const Sprite = ReactPIXI.Sprite;
const Text = ReactPIXI.Text;

class App extends Component {
  componentDidMount() {
    console.log(assetpath('scott_pilgrim_spritesheet.png'));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Stage
          height={720}
          width={1280}
        >
          <Text
            key="1"
            text="Testing?"
            x={200}
            y={200}
          />
          <Sprite
            height={4276 * 3}
            image={assetpath('scott_pilgrim_spritesheet.png')}
            key="2"
            width={1932 * 3}
            x={200}
            y={300}
          />
        </Stage>
      </div>
    );
  }
}

export default App;
