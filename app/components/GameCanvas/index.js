/**
*
* GameCanvas
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  GAME_ITEM_SIZE,
  GAME_COLS,
} from 'shared/constants';

const StyledGameWrapper = styled.div`
  background: #999;
  border: 2px solid #333;
  margin: 10px auto 0;
  height: ${GAME_ITEM_SIZE * GAME_COLS}px;
  width: ${GAME_ITEM_SIZE * GAME_COLS}px;
  position: relative;
  boxSizing: content-box;
`;

class GameCanvas extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <StyledGameWrapper>
        {React.Children.toArray(this.props.children)}
      </StyledGameWrapper>
    );
  }
}

GameCanvas.propTypes = {
  children: PropTypes.node,
};

export default GameCanvas;
