import React from 'react';
import bind from 'react-autobind';
import Game from 'Game';

class DoorSprite extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.doorSprite = this.props.sprite;
    this.initializeSprite();
  }

  componentDidMount() {
    Game.stage.addChild(this.doorSprite);
  }

  initializeSprite() {
    this.doorSprite.x = this.props.position.x;
    this.doorSprite.y = this.props.position.y;
    this.doorSprite.alpha = 0.75
    this.doorSprite.anchor.set(0.5, 1);
    this.doorSprite.loop = false;
    this.doorSprite.scale.x = 3;
    this.doorSprite.scale.y = 3;
    Game.stage.addChild(this.doorSprite);
  }

  setPosition(x, y) {
    this.doorSprite.x = x;
    this.doorSprite.y = y;
  }

  updateAnimation() {
    const doorSprite = this.doorSprite;
    const status = this.props.status;

    if (status === 'opening') {
      doorSprite.animationSpeed = 2;
      doorSprite.play();
    }

    if (status === 'closing') {
      doorSprite.animationSpeed = -2;
      doorSprite.play();
    }
  }

  render() {
    const status = this.props.status;
    const x = this.props.position.x;
    const y = this.props.position.y;
    this.setPosition(x, y);
    this.updateAnimation(status);
    return null;
  }
}

export default DoorSprite;
