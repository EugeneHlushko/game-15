/**
*
* GameSolo
*
*/

import React from 'react';
import debug from 'debug';
import { cloneDeep } from 'lodash';
import { shuffleArray, tryMove, checkWin } from 'utils/helpers';

import {
  GAME_ITEM_COUNT,
  GAME_ITEM_SIZE,
  GAME_COLS,
  GAME_INITIAL_COORDS,
} from 'shared/constants';

const styles = {
  GameBox: {
    background: '#999',
    border: '2px solid #333',
    margin: '10px auto 0',
    height: `${GAME_ITEM_SIZE * GAME_COLS}px`,
    width: `${GAME_ITEM_SIZE * GAME_COLS}px`,
    position: 'relative',
    boxSizing: 'content-box',
  },
  GameThumb: {
    fontSize: '13px',
    position: 'absolute',
    transition: 'all 500ms ease',
    display: 'block',
    width: `${GAME_ITEM_SIZE}px`,
    height: `${GAME_ITEM_SIZE}px`,
    lineHeight: `${GAME_ITEM_SIZE}px`,
    border: '2px solid #fff',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
};

class GameSolo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    debug.enable('GameSolo');
    const coords = cloneDeep(GAME_INITIAL_COORDS);
    shuffleArray(coords);

    this.state = {
      coords,
    };
  }

  thumbClick = (e) => {
    const { target } = e;
    if (target.classList.contains('empty')) {
      debug('GameSolo')('is empty!');
      return false;
    }
    const i = parseInt(target.innerHTML, 10);
    const moveResult = tryMove(i, this.state.coords);

    if (moveResult) {
      this.setState({ coords: moveResult }, this.didIWin);
    }

    return false;
  };

  didIWin = () => {
    if (checkWin(this.state.coords)) {
      alert('WIN!');
    }
  };

  renderThumbs = (item, i) => {
    const style = {
      left: item.x,
      top: item.y,
      ...styles.GameThumb,
    };

    if (i < GAME_ITEM_COUNT) {
      return (<div key={i} style={style} onClick={this.thumbClick}>{ i + 1 }</div>);
    }

    return (<div key={i} style={style} className="thumb empty" onClick={this.thumbClick} />);
  };

  render() {
    return (
      <div style={styles.GameBox}>
        { this.state.coords.map(this.renderThumbs) }
      </div>
    );
  }
}

GameSolo.propTypes = {

};

export default GameSolo;
