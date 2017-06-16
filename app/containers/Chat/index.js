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

import { socket } from 'utils/socket';
import ChatInputBox from 'components/ChatInputBox';
import ChatMessage from 'components/ChatMessage';

import { makeSelectAppPlayerName } from 'containers/App/selectors';
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
    chatMessages: [],
  };

  componentWillMount() {
    debug.enable('chat');
    debug('chat')('mounting soon!');

    socket.emit('joinChat');
    socket.on('chat', (data) => {
      debug('chat')(data);
      this.setState({ chatMessages: data.chat });
    });
  }

  componentWillUnmount() {
    socket.emit('leaveChat');
  }

  onSend = (message) => {
    // send message using socket.io
    debug('chat')(`Will send a message: ${message}`);
    const chatMessage = {
      time: '18:30:25',
      text: message,
      owner: this.props.playerName,
    };
    socket.emit('chatMessageAdd', chatMessage);
  };

  render() {
    const { chatMessages } = this.state;
    const { playerName } = this.props;

    return (
      <div style={chatBoxStyles}>
        <div><FormattedMessage {...messages.chatMessages} /></div>
        <div>
          { playerName && <ChatInputBox onSend={this.onSend} /> }
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
  playerName: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
};

const mapStateToProps = createStructuredSelector({
  Chat: makeSelectChat(),
  playerName: makeSelectAppPlayerName(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
