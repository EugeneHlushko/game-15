/**
*
* Overlay
*
*/

import React from 'react';
import styled from 'styled-components';

const StyledOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Overlay(props) {
  return (
    <StyledOverlay>
      {React.Children.toArray(props.children)}
    </StyledOverlay>
  );
}

Overlay.propTypes = {
  children: React.PropTypes.node,
};

export default Overlay;
