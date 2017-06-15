/**
*
* Button
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const StyledButton = styled.button`
  width: 120px;
  height: 38px;
  lineHeight: 38px;
  margin: 10px auto 20px;
  display: block;
  background: #03a9f4;
  color: #fff;
  cursor: pointer;
`;

function Button(props) {
  return (
    <StyledButton onClick={props.clickCallback}>
      <FormattedMessage {...props.text} />
    </StyledButton>
  );
}

Button.propTypes = {
  clickCallback: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
};

export default Button;
