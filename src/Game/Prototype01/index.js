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
      walkers: [
        {
          id: 0,
          position: {
            x: 200,
            y: 510,
          },
          isWalking: true,
        },
        {
          id: 1,
          position: {
            x: -200,
            y: 510,
          },
          isWalking: true,
        },
        {
          id: 2,
          position: {
            x: -400,
            y: 510,
          },
          isWalking: true,
        }
      ],
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
      const fps =  Math.round(this.app.ticker.FPS);
      const walkers = this.state.walkers.map(walker => {
        if (walker.position.x > 1000) {
          walker.isWalking = false;
        } else {
          walker.position.x += 5;
        }
        return walker;
      });

      this.setState({
        fps,
        walkers,
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

export default Prototype01;
