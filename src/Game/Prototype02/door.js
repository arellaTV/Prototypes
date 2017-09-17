import React from 'react';
import bind from 'react-autobind';
import DoorSprite from './doorSprite';

class Door extends React.Component {
  constructor(props) {
    super(props);
    bind(this);
    const position = this.props.position;
    this.state = {
      position,
    };
  }

  render() {
    const position = this.state.position;
    return (
      <DoorSprite
        position={position}
      />
    );
  }
}

export default Door;
