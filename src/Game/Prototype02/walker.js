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
    const sprite = new window.PIXI.extras.AnimatedSprite(this.walkingFrames);
    sprite.interactive = true;
    sprite.buttonMode = true;
    this.sprite = sprite;
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
    const isWalking = this.state.isWalking;
    const position = this.state.position;
    return (
      <WalkerSprite
        isWalking={isWalking}
        position={position}
        sprite={this.sprite}
      />
    );
  }
}

export default Walker;
