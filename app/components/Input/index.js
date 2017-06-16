/**
*
* Input
*
*/

import React from 'react';
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
  function changeevt(evt) {
    props.changeCallback(evt.target.value);
  }

  return (
    <StyledInput onChange={changeevt} value={props.value} />
  );
}

Input.propTypes = {
  changeCallback: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
};

export default Input;
