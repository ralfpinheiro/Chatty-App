import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>
            <img src='./public/images/logo.svg' alt='logo' />
            Chatty
          </a>
          <div className='online-users'>
            <p className='online-text'>
              {this.props.getUser} {this.props.sufix}
            </p>
            <span className='blink'>•</span>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
