import React from 'react';
import bind from 'react-autobind';
import DoorSprite from './doorSprite';

class Door extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.doorSprite = {};
    this.loadAnimations();
    this.createSprite();
    const position = this.props.position;
    this.state = {
      position,
      status: 'closed',
    };
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
    const position = this.state.position;
    const status = this.props.doorStatus;
    const updateCurrentDoorFrame = this.props.updateCurrentDoorFrame;
    return (
      <DoorSprite
        position={position}
        sprite={this.sprite}
        status={status}
        updateCurrentDoorFrame={updateCurrentDoorFrame}
      />
    );
  }
}

export default Door;
