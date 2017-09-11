import React from 'react';
import Walker from './walker';
import Backdrop from './backdrop';
import FPSCounter from './FPScounter';

class Prototype01 extends React.Component {
  constructor() {
    super();
    this.app = new window.PIXI.Application(1280, 720);

    this.state = {
      fps: 0,
      isWalking: true,
      position: {
        x: 200,
        y: 510,
      },
    };
  }

  componentDidMount() {
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();
    this.moveRight();
  }

  componentWillUnMount() {
    this.app.stop();
  }

  moveRight() {
    this.app.ticker.add((delta) => {
      if (this.state.position.x > 1000) {
        this.setState({ isWalking: false });
        return;
      }

      this.setState({
        position: {
          x: this.state.position.x + 5,
          y: this.state.position.y,
        },
        fps: Math.round(this.app.ticker.FPS),
      });
    })
  }

  render() {
    return (
      <div
        id="prototype01"
        ref={thisDiv => this.gameCanvas = thisDiv}
      >
        <Backdrop
          app={this.app}
          position={{ x: 0, y: 0 }}
          scale={3}
        />
        <Walker
          app={this.app}
          position={this.state.position}
          scale={3}
          isWalking={this.state.isWalking}
        />
        <FPSCounter
          app={this.app}
          color={'white'}
          position={{ x: 10, y: 10 }}
          scale={1}
          fps={this.state.fps}
        />
      </div>
    );
  }
}

export default Prototype01;
