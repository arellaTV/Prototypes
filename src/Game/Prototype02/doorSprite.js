import React from 'react';
import bind from 'react-autobind';
import Game from 'Game';

class DoorSprite extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.doorSprite = {};
    this.loadAnimations();
    this.initializeSprite();
  }

  componentDidMount() {
    Game.stage.addChild(this.doorSprite);
  }

  loadAnimations() {
    this.openingFrames = [];
    this.closingFrames = [];
    for (let i = 0; i <= 16; i++) {
      this.openingFrames.push(window.PIXI.Texture.fromFrame(`door_01 ${i}.ase`));
    }
    for (let i = 16; i >= 0; i--) {
      this.closingFrames.push(window.PIXI.Texture.fromFrame(`door_01 ${i}.ase`));
    }
    this.fullCycle = this.openingFrames.concat(this.closingFrames);
  }

  initializeSprite() {
    this.doorSprite = new window.PIXI.extras.AnimatedSprite(this.fullCycle);
    this.doorSprite.x = this.props.position.x;
    this.doorSprite.y = this.props.position.y;
    this.doorSprite.alpha = 0.75
    this.doorSprite.anchor.set(0.5, 1);
    this.doorSprite.animationSpeed = 0.6;
    this.doorSprite.scale.x = 3;
    this.doorSprite.scale.y = 3;

    this.doorSprite.play();
    Game.stage.addChild(this.doorSprite);
  }

  setPosition(x, y) {
    this.doorSprite.x = x;
    this.doorSprite.y = y;
  }

  render() {
    const x = this.props.position.x;
    const y = this.props.position.y;
    this.setPosition(x, y);
    return null;
  }
}

export default DoorSprite;
