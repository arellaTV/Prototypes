import React from 'react';
import bind from 'react-autobind';

class WalkerSprite extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.walker = {};
    this.loadAnimations();
    this.initializeSprite();
  }

  componentDidMount() {
    const app = this.props.app;
    app.stage.addChild(this.walker);
  }

  loadAnimations() {
    this.walkingFrames = [];
    this.idleFrames = [];
    for (let i = 0; i < 6; i++) {
      this.walkingFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_walking_01 ${i}.ase`));
    }
    for (let i = 0; i < 8; i++) {
      this.idleFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_idle ${i}.ase`));
    }
  }

  initializeSprite() {
    const app = this.props.app;
    this.walker = new window.PIXI.extras.AnimatedSprite(this.walkingFrames);
    this.walker.x = this.props.position.x;
    this.walker.y = this.props.position.y;
    this.walker.anchor.set(0.5, 1);
    this.walker.animationSpeed = 0.1;
    this.walker.scale.x = 3;
    this.walker.scale.y = 3;

    const randomFrame = Math.floor(Math.random() * 6);
    this.walker.gotoAndPlay(randomFrame);
    app.stage.addChild(this.walker);
  }

  setPosition(x, y) {
    this.walker.x = x;
    this.walker.y = y;
  }

  updateAnimation(isWalking) {
    if (!isWalking && this.walker.textures === this.walkingFrames) {
      this.walker.textures = this.idleFrames;
      this.walker.play();
    }
  }

  render() {
    const x = this.props.position.x;
    const y = this.props.position.y;
    const isWalking = this.props.isWalking;
    this.setPosition(x, y);
    this.updateAnimation(isWalking);
    return null;
  }
}

export default WalkerSprite;
