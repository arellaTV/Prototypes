import React from 'react';
import bind from 'react-autobind';
import Game from './../index.js'
import Walker from './walker';
import Backdrop from './backdrop';
import Door from './door';
import BuildingCutout from './buildingCutout';
import FPSCounter from './FPScounter';
import Information from './information';
import { walkers } from './level.json';

class Prototype02 extends React.Component {
  constructor() {
    super();
    bind(this);
    this.bindKeyHandlers();
    const fps = 0;
    this.state = {
      doorStatus: 'closed',
      fps,
      information: {},
      walkers,
    };
  }

  componentDidMount() {
    this.gameCanvas.appendChild(Game.view);
    Game.start();
    this.renderFPSCounter();
    this.getLastGitCommit();
  }

  componentWillUnMount() {
    Game.stop();
  }

  bindKeyHandlers() {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 32 && this.state.status !== 'opening') {
        this.updateDoorStatus('opening');
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 32 && this.state.status !== 'closing') {
        this.updateDoorStatus('closing');
      }
    });
  }

  getLastGitCommit() {
    fetch('/api/last-git-commit')
      .then(response => response.json())
      .then(latestGitCommit => this.setState({ information: latestGitCommit }))
      .catch(err => console.warn(err));
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
        <Information
          color={'white'}
          information={this.state.information}
          position={{ x: 10, y: 675 }}
          scale={1}
        />
      </div>
    );
  }
}

export default Prototype02;
