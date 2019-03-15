import React, { Component } from 'react';

class MessageList extends Component {
  //Handle
  handleContent = () => {
    switch (this.props.type) {
      case 'incomingNotification':
        return <span className='message-system'>{this.props.content}</span>;
        break;
      default:
        return <span className='message-content'>{this.props.content}</span>;
        break;
    }
  };

  render() {
    return (
      <div>
        <div className='message'>
          <div className='message-username'>{this.props.user}</div>
          {this.handleContent()}
        </div>
      </div>
    );
  }
}

export default MessageList;
