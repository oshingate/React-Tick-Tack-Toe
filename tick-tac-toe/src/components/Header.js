import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className='header'>
        <div className='container'>
          <strong>Tick-Tac-Toe</strong>
        </div>
      </header>
    );
  }
}

export default Header;
