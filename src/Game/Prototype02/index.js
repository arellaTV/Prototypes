import React from 'react';
import Walker from './walker';
import Backdrop from './backdrop';
import FPSCounter from './FPScounter';
import { walkers } from './level.json';

class Prototype02 extends React.Component {
  constructor() {
    super();
    const fps = 0;
    this.app = new window.PIXI.Application(1280, 720);
    this.state = {
      fps,
      walkers,
    };
  }

  componentDidMount() {
    this.gameCanvas.appendChild(this.app.view);
    this.app.start();
    this.renderFPSCounter();
  }

  componentWillUnMount() {
    this.app.stop();
  }

  renderFPSCounter() {
    const app = this.app;
    app.ticker.add((delta) => {
      const fps =  Math.round(this.app.ticker.FPS);
      this.setState({ fps });
    })
  }

  render() {
    return (
      <div
        className="prototype"
        ref={thisDiv => this.gameCanvas = thisDiv}
      >
        <Backdrop
          app={this.app}
          position={{ x: 0, y: 0 }}
          scale={3}
        />
        {this.state.walkers.map(walker => (
          <Walker
            app={this.app}
            key={walker.id}
            position={walker.position}
            scale={3}
            isWalking={walker.isWalking}
          />
        ))}
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

export default Prototype02;
