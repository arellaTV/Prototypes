import React from 'react';
import bind from 'react-autobind';

class Walker extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.walker = {};
    this.initializeSprite();
  }

  componentDidMount() {
    const app = this.props.app;
    app.stage.addChild(this.walker);
  }

  initializeSprite() {
    const app = this.props.app;
    const frames = [];
    for (let i = 0; i < 6; i++) {
      frames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_spritesheet_walking_01 ${i}.ase`))
    }
    this.walker = new window.PIXI.extras.AnimatedSprite(frames);
    this.walker.x = this.props.position.x;
    this.walker.y = this.props.position.y;
    this.walker.anchor.set(0.5);
    this.walker.animationSpeed = 0.1;
    this.walker.scale.x = 3;
    this.walker.scale.y = 3;
    this.walker.play();
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