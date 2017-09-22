import React from 'react';
import bind from 'react-autobind';
import Game from './../index.js'

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

    const randomFrame = Math.floor(Math.random() * 6);
    this.walkerSprite.gotoAndPlay(randomFrame);
  }

  setPosition(x, y) {
    this.walkerSprite.x = x;
    this.walkerSprite.y = y;
  }

  updateAnimation(isOpening, isWalking) {
    const currentDoorFrame = this.props.currentDoorFrame;
    const frames = this.props.frames;
    if (isOpening) {
      if (currentDoorFrame > 0 && currentDoorFrame < 7) {
        // frame 3
        this.walkerSprite.textures = [frames.tighteningFrames[0]];
        this.walkerSprite.position.y = this.props.position.y - 10;
      } else if (currentDoorFrame > 6 && currentDoorFrame < 12) {
        // frame 4
        this.walkerSprite.textures = [frames.tighteningFrames[1]];
        this.walkerSprite.position.y = this.props.position.y - 20;
      } else if (currentDoorFrame > 14 && currentDoorFrame < 17) {
        // frame 5
        this.walkerSprite.textures = [frames.tighteningFrames[2]];
        this.walkerSprite.position.y = this.props.position.y - 30;
      }
    }
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
    const isOpening = this.props.isOpening;
    const isWalking = this.props.isWalking;
    const x = this.props.position.x;
    const y = this.props.position.y;
    this.setPosition(x, y);
    this.updateAnimation(isOpening, isWalking);
    return null;
  }
}

export default WalkerSprite;
