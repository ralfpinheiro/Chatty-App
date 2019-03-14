import React, { Component } from 'react';

class MessageList extends Component {
  handleContent = () => {
    switch (this.props.type) {
      case 'meMessage':
        return <span className='message system'>{this.props.content}</span>;
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
          <span className='message-username'>{this.props.user}</span>
          {this.handleContent()}
        </div>
        {/* <div className='message system'>Anonymous1 changed their name to nomnom.</div> */}
      </div>
    );
  }
}

export default MessageList;
