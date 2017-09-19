import React from 'react';
import bind from 'react-autobind';
import WalkerSprite from './walkerSprite';
import Game from './../index.js'

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
    for (let i = 0; i < 3; i++) {
      openingFrames.push(window.PIXI.Texture.fromFrame(`scott_pilgrim_opening ${i}.ase`));
    }
    this.frames = { walkingFrames, idleFrames, openingFrames }
  }

  moveRight() {
    let position = this.state.position;
    let isWalking = this.state.isWalking;
    const speed = this.state.speed;
    const bump = new window.Bump(window.PIXI);
    const door = Game.stage.children[1].hitArea;

    Game.ticker.add((delta) => {
      const walker = this.sprite.getBounds();
      const isColliding = bump.hitTestRectangle(walker, door);
      if (!isColliding) {
        position.x += speed;
        isWalking = true;
      } else if (isColliding && isWalking !== false) {
        isWalking = false;
        if (position.x < door.x + door.width) {
          position.x = door.x - door.width - 20;
        } else if (position.x >= door.x + door.width) {
          position.x = door.x + door.width + 110;
        }
      } else if (isColliding) {
        if (position.x < door.x + door.width) {
          position.x = door.x - door.width - 20;
        } else if (position.x >= door.x + door.width) {
          position.x = door.x + door.width + 110;
        }
      }

      if (position.x > 1380) {
        position.x = -100;
        position.x += speed;
        isWalking = true;
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
