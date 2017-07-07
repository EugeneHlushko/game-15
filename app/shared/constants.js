const GAME_ITEM_COUNT = 15;
const GAME_ITEM_SIZE = 32;
const GAME_COLS = 4;
const GAME_INITIAL_COORDS = Array.from(new Array(16), (val, index) => index + 1).map((item) => indexToCoord(item - 1));

const GAME_REQUEST_NEW_GAME = 'GAME_REQUEST_NEW_GAME';
const GAME_REQUEST_NEW_GAME_CANCEL = 'GAME_REQUEST_NEW_GAME_CANCEL';
const GAME_UPDATE = 'GAME_UPDATE';
const GAME_STARTED = 'GAME_STARTED';
const GAME_MOVE_THUMB = 'GAME_MOVE_THUMB';
const GAME_OVER = 'GAME_OVER';
const GAME_LEAVE = 'GAME_LEAVE';

const SOCKET_NAME_SET = 'SOCKET_NAME_SET';

function indexToCoord(i) {
  let row = 0;
  // 4, 5
  // 11
  if (i >= GAME_COLS && i < GAME_COLS * 2) {
    // 4,5,6,7
    row = 1;
  } else if (i >= GAME_COLS * 2 && i < GAME_COLS * 3) {
    // 8,9,10,11
    row = 2;
  } else if (i >= GAME_COLS * 3) {
    row = 3;
  }

  const calculatedCoords = {
    x: (row > 0) ? (i - (row * GAME_COLS)) * GAME_ITEM_SIZE : i * GAME_ITEM_SIZE,
    y: row * GAME_ITEM_SIZE,
  };

  return calculatedCoords;
}

module.exports = {
  GAME_ITEM_COUNT,
  GAME_ITEM_SIZE,
  GAME_COLS,
  GAME_INITIAL_COORDS,
  GAME_REQUEST_NEW_GAME,
  GAME_UPDATE,
  GAME_STARTED,
  GAME_MOVE_THUMB,
  GAME_OVER,
  GAME_LEAVE,
  SOCKET_NAME_SET,
  GAME_REQUEST_NEW_GAME_CANCEL,
};
