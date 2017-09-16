import React from 'react';
import bind from 'react-autobind';

class WalkerSprite extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.walkerSprite = {};
    this.loadAnimations();
    this.initializeSprite();
  }

  componentDidMount() {
    const app = this.props.app;
    app.stage.addChild(this.walkerSprite);
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
    this.walkerSprite = new window.PIXI.extras.AnimatedSprite(this.walkingFrames);
    this.walkerSprite.x = this.props.position.x;
    this.walkerSprite.y = this.props.position.y;
    this.walkerSprite.anchor.set(0.5, 1);
    this.walkerSprite.animationSpeed = 0.1;
    this.walkerSprite.scale.x = 3;
    this.walkerSprite.scale.y = 3;

    const randomFrame = Math.floor(Math.random() * 6);
    this.walkerSprite.gotoAndPlay(randomFrame);
    app.stage.addChild(this.walkerSprite);
  }

  setPosition(x, y) {
    this.walkerSprite.x = x;
    this.walkerSprite.y = y;
  }

  updateAnimation(isWalking) {
    if (!isWalking && this.walkerSprite.textures === this.walkingFrames) {
      this.walkerSprite.textures = this.idleFrames;
      this.walkerSprite.play();
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
