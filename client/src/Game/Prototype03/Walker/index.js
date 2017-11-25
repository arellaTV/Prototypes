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
    this.state = {
      id: this.props.id,
      isWalking: this.props.isWalking,
      position: this.props.position,
      speed: this.props.speed,
    };
  }

  componentDidMount() {
    this.sprite.isWalking = this.props.isWalking;
    if (this.sprite.isWalking) this.moveRight();
  }

  createSprite() {
    const sprite = new window.PIXI.extras.AnimatedSprite(this.frames.walkingFrames);
    sprite.interactive = true;
    sprite.buttonMode = true;
    this.sprite = sprite;
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

    // Add movement to Game loop
    Game.ticker.add(() => {
      // Get the sprite's current position
      let position = this.state.position;
      let isWalking = this.sprite.isWalking;

      // Add to the sprite's current position by the speed constant
      if (isWalking) {
        position.x += speed;
      }

      // If the sprite leaves the right side of screen, reset to left side
      if (position.x > 1380) {
        position.x = -100;
        position.x += speed;
      }

      // Sets the state to keep track of the Walker's position
      this.setState({
        isWalking,
        position,
      })
    })
  }

  render() {
    const frames = this.frames;
    const isWalking = this.state.isWalking;
    const position = this.state.position;
    return (
      <WalkerSprite
        frames={frames}
        isWalking={isWalking}
        position={position}
        sprite={this.sprite}
      />
    );
  }
}

export default Walker;
