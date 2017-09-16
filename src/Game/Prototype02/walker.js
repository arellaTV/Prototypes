import React from 'react';
import bind from 'react-autobind';
import WalkerSprite from './walkerSprite';

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
    const app = this.props.app;
    let position = this.state.position;
    let isWalking = this.state.isWalking;
    app.ticker.add((delta) => {
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
    const position = this.state.position;
    const isWalking = this.state.isWalking;
    return (
      <WalkerSprite
        app={this.props.app}
        position={position}
        isWalking={isWalking}
      />
    );
  }
}

export default Walker;
