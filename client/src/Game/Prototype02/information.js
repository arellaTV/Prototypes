import React from 'react';
import bind from 'react-autobind';
import Game from 'Game';

class Information extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    this.information = new window.PIXI.Text('');
    this.information.anchor.set(0);
    this.information.style = { fill: props.color };
    this.information.interactive = true;
    this.information.buttonMode = true;
    this.information.on('pointerdown', () => {
      if (this.props.information) {
        const hash = this.props.information.hash;
        window.open(`https://github.com/hold-the-door-game/Prototypes/commit/${this.props.information.hash}`)
      }
    });
  }

  componentDidMount() {
    Game.stage.addChild(this.information);
  }

  setPosition(x, y) {
    this.information.x = x;
    this.information.y = y;
  }

  setScale(scale) {
    this.information.scale.x = scale;
    this.information.scale.y = scale;
  }

  updateInformation(information) {
    if (Object.keys(information).length !== 0 && information.constructor === Object) {
      this.information.text = `Latest commit: ${information.hash}`;
    }
  }

  render() {
    const x = this.props.position.x;
    const y = this.props.position.y;
    const scale = this.props.scale;
    const information = this.props.information;
    this.setPosition(x, y);
    this.setScale(scale);
    this.updateInformation(information)
    return null;
  }
}

export default Information;