/**
*
* OverlayBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledBox = styled.div`
  padding: 20px;
  background: #fff;
  border: 1px solid #000;
  text-align: center;
`;

function OverlayBox(props) {
  return (
    <StyledBox>
      {React.Children.toArray(props.children)}
    </StyledBox>
  );
}

OverlayBox.propTypes = {
  children: PropTypes.node,
};

export default OverlayBox;
