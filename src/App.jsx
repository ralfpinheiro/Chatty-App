import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageContainer from './MessageContainer.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { username: 'John', content: 'Hey dude!', id: 23 },
        { username: 'Mary', content: 'How are you John?', id: 3 }
      ],
      currentUser: 'Anonymous'
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
    this.socket = new WebSocket('ws://localhost:3001/');
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 37, username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
    this.socket.onopen = event => {
      console.log('Connected ccc to the server');
    };
  }

  onNewMessage(content) {
    const newMessage = {
      username: this.state.currentUser,
      content: content
    };
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({ messages: messages });
    this.socket.send(JSON.stringify(newMessage));
  }

  onNewUser(user) {
    this.setState({ currentUser: user });
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
