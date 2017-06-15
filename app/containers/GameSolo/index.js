/*
 *
 * GameSolo
 *
 */

import React, { PropTypes } from 'react';
import debug from 'debug';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { cloneDeep } from 'lodash';
import { shuffleArray, tryMove, checkWin } from 'utils/helpers';

import GameThumb from 'components/GameThumb';

import {
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

    this.state = {
      coords: shuffleArray(GAME_INITIAL_COORDS),
    };
  }

  thumbClick = (index) => {
    const moveResult = tryMove(index, this.state.coords);

    if (moveResult) {
      this.setState({ coords: moveResult }, this.didIWin);
    }
  };

  didIWin = () => {
    if (checkWin(this.state.coords)) {
      alert('WIN!');
    }
  };

  render() {
    const { coords } = this.state;

    return (
      <div style={styles.GameBox}>
        <Helmet
          title="GameSolo"
          meta={[
            { name: 'description', content: 'Description of GameSolo' },
          ]}
        />
        {
          coords.map((item, i) => <GameThumb key={i} index={i} clickCallback={this.thumbClick} x={item.x} y={item.y} />)
        }
      </div>
    );
  }
}

GameSolo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(GameSolo);
