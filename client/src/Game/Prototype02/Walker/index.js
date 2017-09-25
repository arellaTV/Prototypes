import React from 'react';
import bind from 'react-autobind';
import WalkerSprite from './sprite';
import Game from 'Game/index.js'

class Walker extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.loadAnimations();
    this.createSprite();
    const canOpen = false;
    const collisionDoor = null;
    const id = this.props.id;
    const isColliding = false;
    const isOpening = false;
    const isWalking = this.props.isWalking;
    const position = this.props.position;
    const speed = this.props.speed;
    this.state = {
      canOpen,
      collisionDoor,
      id,
      isColliding,
      isOpening,
      isWalking,
      position,
      speed,
    };
  }

  componentDidMount() {
    const isWalking = this.props.isWalking;
    if (isWalking) this.moveRight();
    this.checkForCollisions();
    this.handleCollisions();
  }

  checkForCollisions() {
    const bump = new window.Bump(window.PIXI);

    Game.ticker.add((delta) => {
      const doors = Game.stage.children.filter(sprite => sprite.class === 'door' ? sprite : null);
      const walker = this.sprite.getBounds();
      let collisionDoor = this.state.collisionDoor;
      let isColliding = false;
      let isWalking = this.state.isWalking;
      doors.map(door => {
        if (bump.hitTestRectangle(walker, door.hitArea)) {
          collisionDoor = door;
          isColliding = true;
          isWalking = false;
        }
      });

      this.setState({
        collisionDoor,
        isColliding,
        isWalking,
      });
    });

  }

  createSprite() {
    const sprite = new window.PIXI.extras.AnimatedSprite(this.frames.walkingFrames);
    sprite.interactive = true;
    sprite.buttonMode = true;
    this.sprite = sprite;
  }

  handleCollisions() {
    Game.ticker.add((delta) => {
      let canOpen = this.state.canOpen;
      let collisionDoor = this.state.collisionDoor;
      let isColliding = this.state.isColliding;
      let isWalking = this.state.isWalking;
      let position = this.state.position;
      if (isColliding) {
        canOpen = true;
        if (isWalking === true) {
          isWalking = false;
        }
        if (position.x <= collisionDoor.hitArea.x) {
          position.x = collisionDoor.hitArea.x - collisionDoor.hitArea.width - 10;
        } else {
          position.x = collisionDoor.hitArea.x + collisionDoor.hitArea.width + 100;
        }
      }

      this.setState({
        canOpen,
        isWalking,
        position,
      });
    });
  }

  loadAnimations() {
    const walkingFrames = [];
    const idleFrames = [];
    const extendingFrames = [];
    const tighteningFrames = [];
    for (let i = 0; i < 6; i++) {
      walkingFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_walking_01 ${i}.ase`));
    }
    for (let i = 0; i < 8; i++) {
      idleFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_idle ${i}.ase`));
    }
    for (let i = 0; i < 3; i++) {
      extendingFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_opening ${i}.ase`));
    }
    for (let i = 2; i < 5; i++) {
      tighteningFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_opening ${i}.ase`));
    }
    this.frames = { walkingFrames, idleFrames, extendingFrames, tighteningFrames }
  }

  moveRight() {
    const speed = this.state.speed;
    Game.ticker.add((delta) => {
      let position = this.state.position;
      let canOpen = this.state.canOpen;
      let collisionDoor = this.state.collisionDoor;
      let isColliding = this.state.isColliding;
      let isWalking = false;

      if (!isColliding) {
        position.x += speed;
        canOpen = false;
        collisionDoor = null;
        isWalking = true;
      }

      if (position.x > 1380) {
        position.x = -100;
        position.x += speed;
        isWalking = true;
      }

      this.setState({
        canOpen,
        collisionDoor,
        isWalking,
        position,
      })
    })
  }

  render() {
    const currentDoorFrame = this.props.currentDoorFrame;
    const frames = this.frames;
    const isOpening = this.state.isOpening;
    const isWalking = this.state.isWalking;
    const position = this.state.position;
    return (
      <WalkerSprite
        frames={frames}
        currentDoorFrame={currentDoorFrame}
        isOpening={isOpening}
        isWalking={isWalking}
        position={position}
        sprite={this.sprite}
      />
    );
  }
}

export default Walker;
