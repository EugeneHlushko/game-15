/**
*
* Input
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 3px 10px;
  border: 1px solid #333;
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  color: #000;
`;

function Input(props) {
  function changeEventHandler(evt) {
    props.changeCallback(evt.target.value);
  }

  function keyDownListener(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      props.submitCallback();
    }
  }

  return (
    <StyledInput onChange={changeEventHandler} value={props.value} onKeyDown={keyDownListener} />
  );
}

Input.propTypes = {
  // why the heck eslint picks this one up?
  changeCallback: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  submitCallback: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default Input;
