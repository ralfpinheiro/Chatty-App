import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import Nav from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ user: 'John', content: 'XXX', id: 23 }, { user: 'Mary', content: 'XXXdesr', id: 3 }],
      currentUser: 'Jake'
    };
  }

  render() {
    return (
      <div>
        <Nav />
        <Message messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
