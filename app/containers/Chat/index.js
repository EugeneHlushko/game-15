/*
 *
 * Chat
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import debug from 'debug';

import ChatInputBox from 'components/ChatInputBox';
import ChatMessage from 'components/ChatMessage';

import makeSelectChat from './selectors';
import messages from './messages';

const chatBoxStyles = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  right: 0,
  borderTop: '1px solid #607d8b',
  padding: '15px 0 0 15px',
};

export class Chat extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    chatMessages: [
      {
        time: '18:30:21',
        text: 'This is a cool chat message man!',
        owner: 'John',
      },
      {
        time: '18:30:25',
        text: 'I dont think so, John!',
        owner: 'Bella',
      },
    ],
  };

  onSend = (message) => {
    // send message using socket.io
    debug('ChatInputBox')(`Will send a message: ${message}`);
  };

  render() {
    const { chatMessages } = this.state;

    return (
      <div style={chatBoxStyles}>
        <div><FormattedMessage {...messages.chatMessages} /></div>
        <div>
          <ChatInputBox onSend={this.onSend} />
          <div>
            {chatMessages.map((message, index) => <ChatMessage key={index} {...message} />)}
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Chat: makeSelectChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);