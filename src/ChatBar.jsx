import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      content: ''
    };
    this.onCompose = this.onCompose.bind(this);
    this.onContent = this.onContent.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.onUserKeyChange = this.onUserKeyChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

  onCompose(event) {
    this.setState((prev, props) => ({
      type: 'postMessage',
      content: ''
    }));
  }

  keyPress(event) {
    if (event.keyCode == 13) {
      this.props.onNewMessage(this.state.content);
      this.setState({
        content: ''
      });
    }
  }

  onUserChange(event) {
    this.setState({
      user: event.target.value
    });
  }

  onUserKeyChange(event) {
    if (event.keyCode == 13) {
      this.props.onNewUser(this.state.user);
    }
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    return (
      <div>
        <footer className='chatbar'>
          <input
            onChange={this.onUserChange}
            onKeyDown={this.onUserKeyChange}
            value={this.state.user}
            className='chatbar-username'
            placeholder='Your Name (Optional)'
          />
          <input
            onChange={this.onContent}
            value={this.state.content}
            onKeyDown={this.keyPress}
            className='chatbar-message'
            placeholder='Type a message and hit ENTER'
          />
        </footer>
      </div>
    );
  }
}

export default ChatBar;
