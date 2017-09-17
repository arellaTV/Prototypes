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

  createSprite() {
    const sprite = new window.PIXI.extras.AnimatedSprite(this.fullCycle);
    sprite.interactive = true;
    sprite.buttonMode = true;
    window.addEventListener('keydown', (event) => {
      console.log(event.keyCode);
      if (event.keyCode === 32 && this.state.status !== 'opening') {
        this.updateStatus('opening');
      }
    });

    window.addEventListener('keyup', (event) => {
      console.log('key released', event.keyCode);
      if (event.keyCode === 32 && this.state.status !== 'closing') {
        this.updateStatus('closing');
      }
    })
    this.sprite = sprite;
  }

  updateStatus(status) {
    if (this.state.status !== status) {
      this.setState({ status });
    }
  }

  render() {
    const position = this.state.position;
    const frames = {
      closingFrames: this.closingFrames,
      openingFrames: this.openingFrames,
    }
    return (
      <DoorSprite
        frames={frames}
        position={position}
        sprite={this.sprite}
        status={this.state.status}
        updateStatus={this.updateStatus}
      />
    );
  }
}

export default Door;
