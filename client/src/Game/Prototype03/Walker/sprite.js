import React from 'react';
import bind from 'react-autobind';
import Game from 'Game/index.js'

class WalkerSprite extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.walkerSprite = this.props.sprite;
    this.initializeSprite();
  }

  componentDidMount() {
    Game.stage.addChild(this.walkerSprite);
  }

  initializeSprite() {
    this.walkerSprite.x = this.props.position.x;
    this.walkerSprite.y = this.props.position.y;
    this.walkerSprite.anchor.set(0.5, 1);
    this.walkerSprite.animationSpeed = 0.1;
    this.walkerSprite.scale.x = 3;
    this.walkerSprite.scale.y = 3;
    this.walkerSprite.class = 'walker';

    const randomFrame = Math.floor(Math.random() * 6);
    this.walkerSprite.gotoAndPlay(randomFrame);
  }

  setPosition(x, y) {
    this.walkerSprite.x = x;
    this.walkerSprite.y = y;
  }

  updateAnimation(isWalking) {
    const frames = this.props.frames;
    if (!isWalking && this.walkerSprite.textures === frames.walkingFrames) {
      this.walkerSprite.textures = frames.idleFrames;
      this.walkerSprite.loop = true;
    } else if (isWalking && this.walkerSprite.textures === frames.idleFrames) {
      this.walkerSprite.textures = frames.walkingFrames;
      this.walkerSprite.loop = true;
    }
    this.walkerSprite.play();
  }

  render() {
    const isWalking = this.props.isWalking;
    const x = this.props.position.x;
    const y = this.props.position.y;
    this.setPosition(x, y);
    this.updateAnimation(isWalking);
    return null;
  }
}

export default WalkerSprite;
