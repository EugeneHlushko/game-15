/**
*
* ChatInputBox
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
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
  ChatInputButton: {
    width: '120px',
    height: '38px',
    lineHeight: '38px',
    margin: '10px auto 20px',
    display: 'block',
    background: '#03a9f4',
    color: '#fff',
    cursor: 'pointer',
  },
};

class ChatInputBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    message: '',
    error: false,
  };

  handleSendClick = () => {
    const { message } = this.state;
    if (message.length > 1) {
      this.props.onSend();
    } else {
      this.setState({ error: true });
    }
  };

  onChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    const { message } = this.state;

    return (
      <div style={styles.ChatInputContainer}>
        <textarea style={styles.TextArea} value={message} onChange={this.onChange} />
        <button style={styles.ChatInputButton} onClick={this.handleSendClick}>
          <FormattedMessage {...messages.send} />
        </button>
      </div>
    );
  }
}

ChatInputBox.propTypes = {
  onSend: React.PropTypes.func.isRequired,
};

export default ChatInputBox;
