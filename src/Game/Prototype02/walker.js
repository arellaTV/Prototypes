import React from 'react';
import bind from 'react-autobind';
import WalkerSprite from './walkerSprite';
import Game from 'Game';

class Walker extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    const id = this.props.id;
    const isWalking = this.props.isWalking;
    const position = this.props.position;
    this.state = {
      id,
      isWalking,
      position,
    };
  }

  componentDidMount() {
    this.moveRight();
  }

  moveRight() {
    let position = this.state.position;
    let isWalking = this.state.isWalking;
    Game.ticker.add((delta) => {
      if (position.x > 1000) {
        isWalking = false;
      } else {
        position.x += 5;
      }
      this.setState({
        isWalking,
        position,
      })
    })
  }

  render() {
    const isWalking = this.state.isWalking;
    const position = this.state.position;
    return (
      <WalkerSprite
        isWalking={isWalking}
        position={position}
      />
    );
  }
}

export default Walker;
