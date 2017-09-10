import React, { Component } from 'react';
import Walker from './walker';

class Prototype01 extends Component {
  constructor() {
    super();
    this.app = new window.PIXI.Application(1280, 720);

    this.state = {
      position: {
        x: 200,
        y: 400,
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
    const interval = setInterval(() => {
      if (this.state.position.x > 1080) {
        clearInterval(interval);
      }

      this.setState({
        position: {
          x: this.state.position.x + 10,
          y: this.state.position.y,
        },
      });
    }, 16);
  }

  render() {
    return (
      <div ref={thisDiv => this.gameCanvas = thisDiv}>
        <Walker
          app={this.app}
          position={this.state.position}
          scale={0.25}
        />
      </div>
    );
  }
}

export default Prototype01;
