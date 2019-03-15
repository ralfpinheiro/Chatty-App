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

  // Set the message type messages going to the server
  onCompose(event) {
    this.setState((prev, props) => ({
      type: 'postMessage',
      content: ''
    }));
  }
  // Grabs the message content and clear the field
  keyPress(event) {
    if (event.keyCode == 13 && event.target.value === '') {
      event.target.blur();
      alert('Your message is empty');
      return;
    }
    if (event.keyCode == 13) {
      this.props.onNewMessage(this.state.content);
      this.setState({
        content: ''
      });
    }
  }
  // Set current user name with target value
  onUserChange(event) {
    this.setState({
      user: event.target.value
    });
  }
  // Set new Username
  onUserKeyChange(event) {
    if (event.keyCode == 13) {
      this.props.onNewUser(this.state.user);
    }
  }
  // Set current content state to the target value
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    return (
      <div>
        <footer className='chatbar'>
          <div className='chatbar-wrapper'>
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
          </div>
        </footer>
      </div>
    );
  }
}

export default ChatBar;
