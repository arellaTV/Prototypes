import React, { Component } from 'react';

class Prototype01 extends Component {
  componentDidMount() {
    this.app = new window.PIXI.Application(1280, 720);
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();
  }

  componentWillUnMount() {
    this.app.stop();
  }

  render() {
    return (
      <div ref={thisDiv => this.gameCanvas = thisDiv} />
    );
  }
}

export default Prototype01;
