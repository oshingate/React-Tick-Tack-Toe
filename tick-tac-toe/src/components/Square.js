import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className='square'
        onClick={(event) => {
          this.props.handleClick(event, this.props.index);
        }}
      >
        <span>{this.props.data}</span>
      </div>
    );
  }
}

export default Square;
