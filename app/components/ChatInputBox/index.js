/**
*
* ChatInputBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import messages from './messages';

const styles = {
  TextArea: {
    height: '240px',
    border: '1px solid #c1c1c1',
    resize: 'none',
    display: 'block',
    width: '100%',
  },
  ChatInputContainer: {
    float: 'right',
    background: '#fefefe',
    boxSizing: 'border-box',
    padding: '20px',
    width: '300px',
  },
};

class ChatInputBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    message: '',
    error: false,
  };

  onChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSendClick = () => {
    const { message } = this.state;
    if (message.length > 1) {
      this.props.onSend(message);
      this.setState({ message: '' });
    } else {
      this.setState({ error: true });
    }
  };

  keyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.handleSendClick();
      e.preventDefault();
      return false;
    }
    return true;
  };

  render() {
    const { message } = this.state;

    return (
      <div style={styles.ChatInputContainer}>
        <textarea onKeyDown={this.keyDown} style={styles.TextArea} value={message} onChange={this.onChange} />
        <Button clickCallback={this.handleSendClick} text={messages.send} />
      </div>
    );
  }
}

ChatInputBox.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default ChatInputBox;
