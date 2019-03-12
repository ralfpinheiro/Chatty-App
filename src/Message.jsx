import React, { Component } from "react";
import MessageList from "./MessageList.jsx";

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const posts = this.props.messages.map(post => {
      return <MessageList key={post.id} user={post.user} content={post.content} />;
    });

    return (
      <div>
        <main className="messages">{posts}</main>
      </div>
    );
  }
}

export default Message;
