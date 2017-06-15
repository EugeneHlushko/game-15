/**
*
* ChatMessage
*
*/

import React from 'react';

const styles = {
  ChatMessageBox: {
    background: '#fefefe',
    borderBottom: '1px solid #333',
    position: 'relative',
    marginRight: '300px',
  },
  ChatMessageTimeAndOwner: {
    position: 'absolute',
    left: '0',
    top: '0',
  },
  ChatMessageText: {
    marginLeft: '200px',
  },
};

function ChatMessage(props) {
  const { time, owner, text } = props;

  return (
    <div style={styles.ChatMessageBox}>
      <div style={styles.ChatMessageTimeAndOwner}>
        <span>{time}</span>
        <span>{owner}</span>
      </div>
      <div style={styles.ChatMessageText}>{text}</div>
    </div>
  );
}

ChatMessage.propTypes = {
  time: React.PropTypes.string.isRequired,
  owner: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default ChatMessage;
