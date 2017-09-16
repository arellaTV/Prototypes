import React from 'react';
import bind from 'react-autobind';
import Game from 'Game';
import Walker from './walker';
import Backdrop from './backdrop';
import FPSCounter from './FPScounter';
import { walkers } from './level.json';

class Prototype02 extends React.Component {
  constructor() {
    super();
    bind(this);
    const fps = 0;
    this.state = {
      fps,
      walkers,
    };
  }

  componentDidMount() {
    this.gameCanvas.appendChild(Game.view);
    Game.start();
    this.renderFPSCounter();
  }

  componentWillUnMount() {
    Game.stop();
  }

  renderFPSCounter() {
    Game.ticker.add((delta) => {
      const fps =  Math.round(Game.ticker.FPS);
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
          position={{ x: 0, y: 0 }}
          scale={3}
        />
        {this.state.walkers.map(walker => (
          <Walker
            isWalking={walker.isWalking}
            key={walker.id}
            position={walker.position}
            scale={3}
          />
        ))}
        <FPSCounter
          color={'white'}
          fps={this.state.fps}
          position={{ x: 10, y: 10 }}
          scale={1}
        />
      </div>
    );
  }
}

export default Prototype02;
