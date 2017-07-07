/**
*
* ChatMessage
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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
  const { owner, text, time } = props;

  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeString = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

  return (
    <StyledMessageWrapper>
      <span>{timeString} ~</span>
      <StyledMessageOwner>{owner}: </StyledMessageOwner>
      <span>{text}</span>
    </StyledMessageWrapper>
  );
}

ChatMessage.propTypes = {
  owner: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default ChatMessage;
