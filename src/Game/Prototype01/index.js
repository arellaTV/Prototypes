import React, { Component } from 'react';
import Walker from './walker';
import Backdrop from './backdrop';

class Prototype01 extends Component {
  constructor() {
    super();
    this.app = new window.PIXI.Application(1280, 720);

    this.state = {
      position: {
        x: 200,
        y: 420,
      },
    };
  }

  componentDidMount() {
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();
    this.moveRight();
  }

  componentWillUnMount() {
    this.app.stop();
  }

  moveRight() {
    this.app.ticker.add((delta) => {
      if (this.state.position.x > 1000) {
        return;
      }

      this.setState({
        position: {
          x: this.state.position.x + 5,
          y: this.state.position.y,
        },
      });
    })
  }

  render() {
    return (
      <div
        id="prototype01"
        ref={thisDiv => this.gameCanvas = thisDiv}
      >
        <Backdrop
          app={this.app}
          position={{ x: 0, y: 0 }}
          scale={3}
        />
        <Walker
          app={this.app}
          position={this.state.position}
          scale={0.14}
        />
      </div>
    );
  }
}

export default Prototype01;
