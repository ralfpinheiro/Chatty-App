import React, { Component } from 'react';
import MessageList from './MessageList.jsx';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const posts = this.props.messages.map(post => {
      return <MessageList key={post.id} type={post.type} user={post.username} content={post.content} />;
    });

    return (
      <div>
        <main className='messages'>{posts}</main>
      </div>
    );
  }
}

export default MessageContainer;
