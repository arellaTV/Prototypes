import React from 'react';
import bind from 'react-autobind';
import Game from 'Game';
import Walker from './walker';
import Backdrop from './backdrop';
import Door from './door';
import BuildingCutout from './buildingCutout';
import FPSCounter from './FPScounter';
import { walkers } from './level.json';

class Prototype02 extends React.Component {
  constructor() {
    super();
    bind(this);
    const fps = 0;
    this.state = {
      doorStatus: 'closed',
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

  updateDoorStatus(doorStatus) {
    if (this.state.doorStatus !== doorStatus) {
      this.setState({ doorStatus });
    }
  }

  render() {
    return (
      <div
        className="prototype"
        ref={thisDiv => this.gameCanvas = thisDiv}
      >
        <Backdrop
          position={{ x: 2, y: 0 }}
          scale={3}
          updateDoorStatus={this.updateDoorStatus}
        />
        <Door
          position={{ x: 1010, y: 528 }}
          doorStatus={this.state.doorStatus}
        />
        {this.state.walkers.map(walker => (
          <Walker
            isWalking={walker.isWalking}
            key={walker.id}
            position={walker.position}
            speed={walker.speed}
          />
        ))}
        <BuildingCutout
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

export default Prototype02;
