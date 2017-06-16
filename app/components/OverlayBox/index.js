/**
*
* OverlayBox
*
*/

import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  padding: 20px;
  background: #fff;
  border: 1px solid #000;
`;

function OverlayBox(props) {
  return (
    <StyledBox>
      {React.Children.toArray(props.children)}
    </StyledBox>
  );
}

OverlayBox.propTypes = {
  children: React.PropTypes.node,
};

export default OverlayBox;
