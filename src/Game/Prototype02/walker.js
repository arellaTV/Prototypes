import React from 'react';
import bind from 'react-autobind';
import WalkerSprite from './walkerSprite';
import Game from 'Game';

class Walker extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.loadAnimations();
    this.createSprite();
    const id = this.props.id;
    const isWalking = this.props.isWalking;
    const position = this.props.position;
    const speed = this.props.speed;
    this.state = {
      id,
      isWalking,
      position,
      speed,
    };
  }

  componentDidMount() {
    const isWalking = this.props.isWalking;
    if (isWalking)
      this.moveRight();
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
    const openingFrames = [];
    for (let i = 0; i < 6; i++) {
      walkingFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_walking_01 ${i}.ase`));
    }
    for (let i = 0; i < 8; i++) {
      idleFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_idle ${i}.ase`));
    }
    for (let i = 0; i < 5; i++) {
      openingFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_opening ${i}.ase`));
    }
    this.frames = { walkingFrames, idleFrames, openingFrames }
  }

  moveRight() {
    let position = this.state.position;
    let isWalking = this.state.isWalking;
    const speed = this.state.speed;

    Game.ticker.add((delta) => {
      if (position.x > 1000) {
        isWalking = false;
      } else {
        position.x += speed;
      }
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
