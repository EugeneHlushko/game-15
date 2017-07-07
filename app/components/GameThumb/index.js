/**
*
* GameThumb
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debug from 'debug';

import {
  GAME_ITEM_COUNT,
  GAME_ITEM_SIZE,
} from 'shared/constants';

const StyledThumb = styled.div`
  fontSize: 13px;
  position: absolute;
  transition: all 500ms ease;
  display: block;
  width: ${GAME_ITEM_SIZE}px;
  height: ${GAME_ITEM_SIZE}px;
  lineHeight: ${GAME_ITEM_SIZE}px;
  border: 2px solid #fff;
  boxSizing: border-box;
  textAlign: center;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
`;

class GameThumb extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleClick = () => {
    debug.enable('thumb');
    const { index, clickCallback } = this.props;
    debug('thumb')(`clicked: ${index}`);
    clickCallback(index);

    return false;
  };

  render() {
    const { index, x, y } = this.props;
    return (
      <StyledThumb x={x} y={y} onClick={this.handleClick}>
        { index < GAME_ITEM_COUNT ? index + 1 : '' }
      </StyledThumb>
    );
  }
}

GameThumb.propTypes = {
  index: PropTypes.number.isRequired,
  clickCallback: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default GameThumb;
