import React from 'react';
import bind from 'react-autobind';
import Game from 'Game/index.js'

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
        const html_url = this.props.information.html_url;
        window.open(html_url);
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
    if (Object.keys(information).length !== 0 && information.constructor === Object && information.code !== 'ENOENT') {
      this.information.text = `Latest commit: ${information.sha.substring(0, 6)}\n${information.message}\n${information.committer.name}\n`;
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