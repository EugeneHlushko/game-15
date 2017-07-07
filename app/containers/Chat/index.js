/*
 *
 * Chat
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import debug from 'debug';
import styled from 'styled-components';

import { socket } from 'utils/socket';
import ChatInputBox from 'components/ChatInputBox';
import ChatMessage from 'components/ChatMessage';

import { makeSelectAppPlayerName } from 'containers/App/selectors';
import makeSelectChat from './selectors';
import messages from './messages';

const StyledChatContainer = styled.div`
  position: relative;
  borderTop: 1px solid #607d8b;
  padding: 15px 0 0 15px;
`;

const StyledChatMessagesWrapper = styled.div`
  overflow-y: scroll;
  height: 348px;
  background: #fff;
`;

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
      text: message,
      owner: this.props.playerName,
    };
    socket.emit('chatMessageAdd', chatMessage);
  };

  render() {
    const { chatMessages } = this.state;
    const { playerName } = this.props;

    return (
      <StyledChatContainer>
        <div><FormattedMessage {...messages.chatMessages} /></div>
        <div>
          { playerName && <ChatInputBox onSend={this.onSend} /> }
          <StyledChatMessagesWrapper>
            {chatMessages.reverse().map((message, index) => <ChatMessage key={index} {...message} />)}
          </StyledChatMessagesWrapper>
        </div>
      </StyledChatContainer>
    );
  }
}

Chat.propTypes = {
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
