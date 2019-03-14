import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageContainer from './MessageContainer.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
    this.incomingMessage = this.incomingMessage.bind(this);

    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.addEventListener('message', this.incomingMessage);
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 37, username: 'Michelle', content: 'Hello there!' };
      let messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
  }

  onNewMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
    console.log('Client Sends', newMessage);
  }

  incomingMessage(incMessage) {
    let message = JSON.parse(incMessage.data);
    const messages = this.state.messages.concat(message);

    this.setState({
      messages: messages
    });
    console.log('Server Sends', message);
  }

  onNewUser(event) {
    const type = 'postNotification';
    const previousUser = this.state.currentUser;
    let newUser = event;
    const content = `${previousUser} has changed their name to ${newUser}.`;
    const newNotification = {
      content,
      type
    };

    this.setState({
      currentUser: newUser
    });
    this.socket.send(JSON.stringify(newNotification));
    console.log('client sends', newNotification);
  }

  render() {
    return (
      <div>
        <Nav />
        <MessageContainer messages={this.state.messages} />
        <ChatBar onNewUser={this.onNewUser} onNewMessage={(this.state.user, this.onNewMessage)} />
      </div>
    );
  }
}
export default App;
