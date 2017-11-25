import React from 'react';
import bind from 'react-autobind';
import DoorSprite from './sprite';
import Game from 'Game/index.js'

class Door extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.doorSprite = {};
    this.loadAnimations();
    this.createSprite();
    this.state = {
      position: this.props.position,
      status: 'closed',
    };
  }

  checkForCollisions() {
    // const bump = new window.Bump(window.PIXI);

    Game.ticker.add((delta) => {
      const walkers = this.props.walkers;
      // const door = this.sprite.getBounds();
      walkers.forEach((walker) => {
        console.log(walker);
        // if (bump.hitTestRectangle(walker.sprite, door.hitArea)) {
          // do something
        // }
      });
    });
  }

  componentDidMount() {
    this.checkForCollisions();
  }

  createSprite() {
    const sprite = new window.PIXI.extras.AnimatedSprite(this.openingFrames);
    sprite.interactive = true;
    sprite.buttonMode = true;
    this.sprite = sprite;
  }

  loadAnimations() {
    this.openingFrames = [];
    for (let i = 0; i <= 16; i++) {
      this.openingFrames.push(window.PIXI.Texture.fromFrame(`door_01 ${i}.ase`));
    }
  }

  updateStatus(status) {
    if (this.state.status !== status) {
      this.setState({ status });
    }
  }

  render() {
    const scale = this.props.scale;
    const id = this.props.id;
    const position = this.state.position;
    const status = this.props.doorStatus;
    const updateCurrentDoorFrame = this.props.updateCurrentDoorFrame;
    return (
      <DoorSprite
        id={id}
        position={position}
        scale={scale}
        sprite={this.sprite}
        status={status}
        updateCurrentDoorFrame={updateCurrentDoorFrame}
      />
    );
  }
}

export default Door;
