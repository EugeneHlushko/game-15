/**
*
* Button
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const StyledButton = styled.button`
  max-width: 320px;
  height: 38px;
  lineHeight: 38px;
  margin: 10px auto 20px;
  display: block;
  background: #03a9f4;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 0 10px;
  
  &:hover {
    background: #0a6892;
  }
`;

function Button(props) {
  return (
    <StyledButton style={props.style} onClick={props.clickCallback}>
      <FormattedMessage {...props.text} />
    </StyledButton>
  );
}

Button.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default Button;
