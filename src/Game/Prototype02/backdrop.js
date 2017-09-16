import React from 'react';
import bind from 'react-autobind';
import Game from 'Game';

class Backdrop extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.backdrop = window.PIXI.Sprite.fromImage('assets/sprites/office_building_total_01.png');
    const backdrop = this.backdrop;
    backdrop.anchor.set(0);
  }

  componentDidMount() {
    Game.stage.addChild(this.backdrop);
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