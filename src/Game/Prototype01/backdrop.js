import React, { Component } from 'react';
import bind from 'react-autobind';

class Backdrop extends Component {
  constructor(props) {
    super(props);
    this.backdrop = window.PIXI.Sprite.fromImage('assets/sprites/office_building_total_01.png');
    const backdrop = this.backdrop;
    backdrop.anchor.set(0);
    bind(this);
  }

  componentDidMount() {
    const app = this.props.app;
    app.stage.addChild(this.backdrop);
  }

  setPosition(x, y) {
    this.backdrop.x = x;
    this.backdrop.y = y;
  }

  setScale(scale) {
    this.backdrop.scale.x = scale;
    this.backdrop.scale.y = scale;
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

export default Backdrop;