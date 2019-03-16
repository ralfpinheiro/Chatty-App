import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageContainer from './MessageContainer.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
      onlineUsers: 0,
      sufix: 'user online'
    };
    this.socket = new WebSocket('ws://localhost:3001/');
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
    this.incomingMessage = this.incomingMessage.bind(this);
  }

  componentDidMount() {
    this.socket.addEventListener('message', this.incomingMessage);
  }
  // Sends new message to the server
  onNewMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  // Set the  number os connected users
  getUsers(user) {
    this.setState({
      onlineUsers: user.users
    });
    if (user.users > 1) {
      this.setState({
        sufix: 'users online'
      });
    } else {
      this.setState({
        sufix: 'user online'
      });
    }
  }
  // Receives information server
  incomingMessage(incMessage) {
    const message = JSON.parse(incMessage.data);
    const messages = this.state.messages.concat(message);

    if (message.type === 'userCount') {
      return this.getUsers(message);
    }
    this.setState({ messages: messages });
  }

  onNewUser(event) {
    const type = 'postNotification';
    const previousUser = this.state.currentUser;
    const newUser = event;
    const content = `${previousUser} has changed their name to ${newUser}.`;
    const newNotification = { content, type };

    this.setState({ currentUser: newUser });
    this.socket.send(JSON.stringify(newNotification));
  }

  render() {
    return (
      <div>
        <Nav getUser={this.state.onlineUsers} sufix={this.state.sufix} />
        <MessageContainer messages={this.state.messages} />
        <ChatBar onNewUser={this.onNewUser} onNewMessage={(this.state.user, this.onNewMessage)} />
      </div>
    );
  }
}

export default App;
