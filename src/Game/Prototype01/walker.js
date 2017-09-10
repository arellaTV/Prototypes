import React, { Component } from 'react';
import bind from 'react-autobind';

class Walker extends Component {
  constructor(props) {
    super(props);
    this.walker = window.PIXI.Sprite.fromImage('assets/sprites/mario.png');
    this.walker.anchor.set(0.5);
    this.walker.scale.y = 0.25;
    this.walker.scale.x = 0.25;
    bind(this);
  }

  componentDidMount() {
    const app = this.props.app;
    app.stage.addChild(this.walker);
  }

  setPosition(x, y) {
    this.walker.x = x;
    this.walker.y = y;
  }

  setScale(scale) {
    this.walker.scale.x = scale;
    this.walker.scale.y = scale;
  }

  render() {
    const x = this.props.position.x;
    const y = this.props.position.y;
    const scale = this.props.scale;
    this.setPosition(x, y);
    this.setScale(scale);
    return null;
  }
}

export default Walker;