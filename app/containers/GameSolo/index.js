/*
 *
 * GameSolo
 *
 */

import React, { PropTypes } from 'react';
import debug from 'debug';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { shuffleArray, tryMove, checkWin } from 'utils/helpers';

import Button from 'components/Button';
import GameThumb from 'components/GameThumb';
import GameCanvas from 'components/GameCanvas';
import GameOver from 'components/GameOver';

import {
  GAME_INITIAL_COORDS,
} from 'shared/constants';

import messages from './messages';

class GameSolo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    debug.enable('GameSolo');

    this.state = {
      playingGame: false,
      gameOver: false,
    };
  }

  startNewGame = () => {
    this.setState({
      coords: shuffleArray(GAME_INITIAL_COORDS),
      playingGame: true,
    });
  };

  thumbClick = (index) => {
    const moveResult = tryMove(index, this.state.coords);

    if (moveResult) {
      this.setState({ coords: moveResult }, this.didIWin);
    }
  };

  didIWin = () => {
    if (checkWin(this.state.coords)) {
      this.setState({ playingGame: false, gameOver: true });
    }
  };

  render() {
    const { coords, playingGame, gameOver } = this.state;

    return (
      <div>
        <Helmet
          title="GameSolo"
          meta={[
            { name: 'description', content: 'Description of GameSolo' },
          ]}
        />
        {
          playingGame ?
            <GameCanvas>
              {
                coords.map((item, i) => <GameThumb key={i} index={i} clickCallback={this.thumbClick} x={item.x} y={item.y} />)
              }
            </GameCanvas> :
            <div>
              { gameOver && <GameOver solo time={152152151} /> }
              <Button clickCallback={this.startNewGame} text={messages.play} />
            </div>
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
