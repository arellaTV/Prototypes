import React from 'react';
import bind from 'react-autobind';
import Game from 'Game/index.js'

class Foreground extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.foreground = window.PIXI.Sprite.fromImage('assets/sprites/office_building_cutout_01.png');
    const foreground = this.foreground;
    foreground.anchor.set(0);
    foreground.class = 'foreground'
  }

  componentDidMount() {
    Game.stage.addChild(this.foreground);
  }

  setPosition(x, y) {
    this.foreground.x = x;
    this.foreground.y = y;
  }

  setScale(scale) {
    this.foreground.scale.x = scale;
    this.foreground.scale.y = scale;
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

export default Foreground;