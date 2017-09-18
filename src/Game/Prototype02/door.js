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
    this.bindKeyHandlers();
    const position = this.props.position;
    this.state = {
      position,
      status: 'closed',
    };
  }

  bindKeyHandlers() {
    const sprite = this.sprite;
    sprite.on('pointerdown', this.updateStatus.bind(this, 'opening'));
    sprite.on('pointerup', this.updateStatus.bind(this, 'closing'));

    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 32 && this.state.status !== 'opening') {
        this.updateStatus('opening');
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 32 && this.state.status !== 'closing') {
        this.updateStatus('closing');
      }
    });
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
    if (this.props.doorStatus) {
      this.updateStatus(this.props.doorStatus);
    }
    return (
      <DoorSprite
        position={position}
        sprite={this.sprite}
        status={this.state.status}
      />
    );
  }
}

export default Door;
