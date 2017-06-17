const { GAME_INITIAL_COORDS, GAME_REQUEST_NEW_GAME, GAME_UPDATE, GAME_STARTED, GAME_OVER } = require('../../app/shared/constants');
const { cloneDeep } = require('lodash');
const { shuffleArray, tryMove, checkWin } = require('../../app/utils/helpers');

let gameQueue = [];

function socketGame(io) {
  io.on('connection', (socket) => {
    socket.on(GAME_REQUEST_NEW_GAME, () => {
      gameQueue.push(socket);

      socket.on('disconnect', () => {
        // remove player from queue on DC
        gameQueue = gameQueue.filter((item) => item.id !== socket.id);
      });

      if (gameQueue.length === 2) {
        const game = new Game([gameQueue[0], gameQueue[1]]); // eslint-disable-line no-unused-vars
        // cleanup the queue
        gameQueue = [];
      }
    });
  });

  class Game {
    constructor(players) {
      const newCoords = shuffleArray(GAME_INITIAL_COORDS);
      this.players = players;
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
        player.on('GAME_MOVE_THUMB', (index) => {
          const moveResults = tryMove(index, this.playerData[player.id].coords);

          if (moveResults) {
            if (checkWin(moveResults)) {
              this.emitToPlayers(GAME_OVER, player.id);
            }

            this.playerData[player.id].coords = moveResults;
            this.emitToPlayers(GAME_UPDATE, this.playerData);
          }
        });
      });
    }

    emitToPlayers(eventName, data) {
      io.to(this.players[0].id).to(this.players[1].id).emit(eventName, data);
    }
  }
}

module.exports = socketGame;
