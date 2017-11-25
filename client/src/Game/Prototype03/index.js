import React from 'react';
import bind from 'react-autobind';
import Game from 'Game/index.js'
import Walker from './Walker';
import Background from './Setting/background';
import Foreground from './Setting/foreground';
import Door from './Door';
import FPSCounter from './Information/FPScounter';
import { walkers } from './level.json';

class Prototype03 extends React.Component {
  constructor() {
    super();
    bind(this);
    this.state = {
      doorStatus: 'closed',
      fps: 0,
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

  reactWalkers() {
    return this.state.walkers.map(walker => (
      <Walker
        isWalking={walker.isWalking}
        key={walker.id}
        position={walker.position}
        speed={walker.speed}
      />
    ))
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
        <Background
          position={{ x: 2, y: 0 }}
          scale={3}
        />
        <Door
          doorStatus={this.state.doorStatus}
          id={0}
          position={{ x: 1010, y: 528 }}
          scale={3}
          walkers={this.reactWalkers()}
        />
        {this.reactWalkers()}
        <Foreground
          position={{ x: 2, y: 0 }}
          scale={3}
        />
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

export default Prototype03;
