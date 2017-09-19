import React from 'react';
import bind from 'react-autobind';
import Game from './../index.js'

class FPSCounter extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.fpsCounter = new window.PIXI.Text(props.fps);
    this.fpsCounter.anchor.set(0);
    this.fpsCounter.style = { fill: props.color };
  }

  componentDidMount() {
    Game.stage.addChild(this.fpsCounter);
  }

  setPosition(x, y) {
    this.fpsCounter.x = x;
    this.fpsCounter.y = y;
  }

  setScale(scale) {
    this.fpsCounter.scale.x = scale;
    this.fpsCounter.scale.y = scale;
  }

  updateFPS(fps) {
    this.fpsCounter.text = fps;
  }

  render() {
    const x = this.props.position.x;
    const y = this.props.position.y;
    const scale = this.props.scale;
    const fps = this.props.fps;
    this.setPosition(x, y);
    this.setScale(scale);
    this.updateFPS(fps)
    return null;
  }
}

export default FPSCounter;