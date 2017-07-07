/*
 *
 * Game
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import debug from 'debug';
import { tryMove } from 'utils/helpers';

import { socket } from 'utils/socket';
import Button from 'components/Button';
import GameThumb from 'components/GameThumb';
import GameCanvas from 'components/GameCanvas';
import GameOver from 'components/GameOver';
import Timer from 'components/Timer';

import {
  GAME_REQUEST_NEW_GAME,
  GAME_STARTED,
  GAME_MOVE_THUMB,
  GAME_UPDATE,
  GAME_OVER,
  GAME_LEAVE,
  GAME_REQUEST_NEW_GAME_CANCEL,
} from 'shared/constants';

import makeSelectGame from './selectors';
import messages from './messages';

const StyledGameWrapper = styled.div`
  margin: auto;
  padding: 20px 0;
  min-width: 320px;
  max-width: 360px;
`;

const StyledBoardsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EnemyBoardWrapper = styled.div`
  opacity: 0.7;
`;

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    debug.enable('Game');
    this.state = {
      ownCoords: false,
      enemyCoords: false,
      playingGame: false,
      searchingForGame: false,
    };
  }

  componentWillUnmount() {
    if (this.state.playingGame) {
      alert('LEAVER!');
      socket.emit(GAME_LEAVE);
      this.socketUnlistenGameEvents();
    }

    // if we were searching for a game, automatically cancel the search.
    if (this.state.searchingForGame) {
      socket.emit(GAME_REQUEST_NEW_GAME_CANCEL);
    }
  }

  socketUnlistenGameEvents = () => {
    socket.off(GAME_UPDATE);
    socket.off(GAME_OVER);
  };

  requestNewGame = () => {
    // work with socket to request new match
    this.setState({ searchingForGame: true, winnerId: false });

    socket.on(GAME_STARTED, (data) => {
      debug('Game')('Have gotten an update!');
      this.startGame(data);
      // dont listen for game_started anymore;
      socket.off(GAME_STARTED);
    });

    socket.emit(GAME_REQUEST_NEW_GAME);
  };

  startGame = (data) => {
    const enemyId = Object.keys(data).filter((id) => id !== socket.id);
    this.setState({
      ownCoords: data[socket.id].coords,
      enemyCoords: data[enemyId].coords,
      enemyName: data[enemyId].nickname,
      playingGame: true,
      searchingForGame: false,
    });

    socket.on(GAME_STARTED, (serverData) => {
      debug('Game')('Have gotten an update!');
      this.startGame(serverData);
    });

    socket.on(GAME_UPDATE, (serverData) => {
      debug('Game')('Have gotten an update!');
      this.updateGame(serverData);
    });

    socket.on(GAME_OVER, (winnerId) => {
      debug('Game')('Have gotten an update!');

      this.setState({
        playingGame: false,
        winnerId,
      });
    });
  };

  updateGame = (data) => {
    const enemyId = Object.keys(data).filter((id) => id !== socket.id);
    this.setState({
      ownCoords: data[socket.id].coords,
      enemyCoords: data[enemyId].coords,
    });
  };

  clickThumbSync = (index) => {
    // request actual server result and while waiting make positive scenario move
    const moveResult = tryMove(index, this.state.ownCoords);

    if (moveResult) {
      this.setState({ ownCoords: moveResult });
    }

    socket.emit(GAME_MOVE_THUMB, index);
  };

  render() {
    const { ownCoords, enemyCoords, playingGame, searchingForGame, winnerId, enemyName } = this.state;
    debug('Game')(socket.id);
    return (
      <StyledGameWrapper>
        <Helmet
          title="Game"
          meta={[
            { name: 'description', content: 'Description of Game' },
          ]}
        />
        {
          playingGame ?
            <StyledBoardsWrapper>
              <Timer />
              <div>
                My box
                <GameCanvas>
                  {
                    ownCoords.map((item, i) => <GameThumb key={i} index={i} clickCallback={this.clickThumbSync} x={item.x} y={item.y} />)
                  }
                </GameCanvas>
              </div>
              <EnemyBoardWrapper>
                { `${enemyName}'s box` }
                <GameCanvas>
                  {
                    enemyCoords.map((item, i) => <GameThumb key={i} index={i} clickCallback={() => {}} x={item.x} y={item.y} />)
                  }
                </GameCanvas>
              </EnemyBoardWrapper>
            </StyledBoardsWrapper> :
            <div>
              {
                winnerId && <GameOver opponentName={enemyName} winner={winnerId === socket.id} time={152152151} />
              }
              {
                searchingForGame ?
                  <div>
                    looking for the game... please wait
                  </div> :
                  <Button clickCallback={this.requestNewGame} text={messages.play} />
              }
            </div>
        }
      </StyledGameWrapper>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Game: makeSelectGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
