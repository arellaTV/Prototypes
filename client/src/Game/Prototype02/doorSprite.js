import React from 'react';
import bind from 'react-autobind';
import Game from './../index.js'

class DoorSprite extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.doorSprite = this.props.sprite;
    this.initializeSprite();
    this.initializeBoundingBox();
  }

  componentDidMount() {
    Game.stage.addChild(this.doorSprite);
    Game.stage.addChild(this.box);
  }

  initializeBoundingBox() {
    // Get the Door's coordinates
    const doorBounds = this.doorSprite.getBounds();
    const xPosition = doorBounds.x + doorBounds.width * 0.75;
    const yPosition = doorBounds.y;
    const width = 20;
    const height = doorBounds.height;

    // Make a rectangle for collision
    this.doorCollisionBox = new window.PIXI.Rectangle(xPosition, yPosition, width, height);
    this.doorSprite.hitArea = this.doorCollisionBox;

    // Draw a rectangle to show the collision rectangle's behavior (by mirroring its coordinates)
    this.box = new window.PIXI.Graphics();
    this.box.lineStyle(2, 0x0000FF, 1);
    this.box.beginFill(0xFF700B, 1);
    this.box.drawRect(0, 0, width, height);
    this.box.position.x = xPosition;
    this.box.position.y = yPosition;
    this.box.alpha = 0;

    // Bind the size of the collisionBox and rectangle to door sprite animation
    this.doorSprite.onFrameChange = (frame) => {
      this.box.position.x = xPosition - (frame * 9);
      this.doorSprite.hitArea.x = xPosition  - (frame * 9);

      // if the door is mostly open, remove the collision box
      if (frame === 16) {
        this.box.width = 0;
        this.doorSprite.hitArea.width = 0;
        this.doorSprite.hitArea.height = 0;
      // if the door is mostly closed, re-add the collision box
      } else {
        this.box.width = width;
        this.doorSprite.hitArea.width = width;
        this.doorSprite.hitArea.height = height;
      }
    }
  }

  initializeSprite() {
    this.doorSprite.x = this.props.position.x;
    this.doorSprite.y = this.props.position.y;
    this.doorSprite.alpha = 0.75;
    this.doorSprite.anchor.set(0.5, 1);
    this.doorSprite.loop = false;
    this.doorSprite.scale.x = 3;
    this.doorSprite.scale.y = 3;
  }

  setPosition(x, y) {
    this.doorSprite.x = x;
    this.doorSprite.y = y;
  }

  updateAnimation() {
    const doorSprite = this.doorSprite;
    const status = this.props.status;

    if (status === 'opening') {
      doorSprite.animationSpeed = 3;
      doorSprite.play();
    }

    if (status === 'closing') {
      doorSprite.animationSpeed = -1;
      doorSprite.play()
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
