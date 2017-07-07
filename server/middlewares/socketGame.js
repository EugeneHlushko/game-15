const {
  GAME_INITIAL_COORDS,
  GAME_REQUEST_NEW_GAME,
  GAME_UPDATE,
  GAME_STARTED,
  GAME_OVER,
  GAME_LEAVE,
  GAME_MOVE_THUMB,
  GAME_REQUEST_NEW_GAME_CANCEL,
} = require('../../app/shared/constants');
const { cloneDeep } = require('lodash');
const { shuffleArray, tryMove, checkWin } = require('../../app/utils/helpers');

let gameQueue = [];
// TODO games array for proper GC after game was finished.

function socketGame(io) {
  io.on('connection', (socket) => {
    socket.on(GAME_REQUEST_NEW_GAME, () => {
      gameQueue.push(socket);

      if (gameQueue.length === 2) {
        const game = new Game([gameQueue[0], gameQueue[1]]); // eslint-disable-line no-unused-vars
        // cleanup the queue
        gameQueue = [];
      }
    });

    // i want to listen for these events with this specific callback only for those who did request the new game.
    // so putting these into game request event callback would make it bind these listeners each time instead of only once
    socket.on(GAME_REQUEST_NEW_GAME_CANCEL, socketGameSearchCancel.bind(this, socket));
    socket.on('disconnect', socketGameSearchCancel.bind(this, socket));
  });

  // when socket leaves or when he gets DCed we want to make sure he is not in the queue;
  function socketGameSearchCancel(socket) {
    gameQueue = gameQueue.filter((item) => item.id !== socket.id);
  }

  // TODO: move out to separate file
  class Game {
    constructor(players) {
      const newCoords = shuffleArray(GAME_INITIAL_COORDS);
      this.players = players;
      // use to store the game duration, in high scores and match history
      this.startedAt = new Date().getTime();
      this.playerData = {
        [this.players[0].id]: {
          coords: cloneDeep(newCoords),
          nickname: this.players[0].nickname,
        },
        [this.players[1].id]: {
          coords: cloneDeep(newCoords),
          nickname: this.players[1].nickname,
        },
      };

      // Players need to react to emits
      this.emitToPlayers(GAME_STARTED, this.playerData);

      this.players.forEach((player) => {
        player.on(GAME_MOVE_THUMB, this.handleGameMoveThumb.bind(this, player));

        // if you leave, opponent wins
        player.on(GAME_LEAVE, this.handleGameLeave.bind(this, player));
      });
    }

    emitToPlayers(eventName, data) {
      io.to(this.players[0].id).to(this.players[1].id).emit(eventName, data);
    }

    handleGameMoveThumb(player, index) {
      const moveResults = tryMove(index, this.playerData[player.id].coords);

      if (moveResults) {
        this.playerData[player.id].coords = moveResults;
        this.emitToPlayers(GAME_UPDATE, this.playerData);

        if (checkWin(moveResults)) {
          this.winner = player.id;
          this.gameOver();
        }
      }
    }

    handleGameLeave(player) {
      this.winner = this.players.filter((iteratedPlayer) => iteratedPlayer.id !== player.id)[0].id;
      this.gameOver();
    }

    gameOver() {
      // TODO: do a db write of the game result
      this.finishedAt = new Date().getTime();
      this.emitToPlayers(GAME_OVER, this.winner);

      this.players.forEach((player) => {
        player.removeAllListeners(GAME_MOVE_THUMB);
        player.removeAllListeners(GAME_LEAVE);
      });
    }
  }
}

module.exports = socketGame;
