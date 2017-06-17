/**
*
* ChatMessage
*
*/

import React from 'react';
import styled from 'styled-components';

const StyledMessageWrapper = styled.div`
  background: #fefefe;
  border-bottom: 1px solid #f9f7f7;
  position: relative;
  font-size: 14px;
  padding: 3px 10px;
`;

const StyledMessageOwner = styled.span`
  font-weight: bold;
`;

function ChatMessage(props) {
  const { owner, text } = props;

  return (
    <StyledMessageWrapper>
      <StyledMessageOwner>{owner}: </StyledMessageOwner>
      <span>{text}</span>
    </StyledMessageWrapper>
  );
}

ChatMessage.propTypes = {
  owner: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default ChatMessage;
