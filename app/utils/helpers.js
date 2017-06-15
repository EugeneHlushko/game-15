import { cloneDeep } from 'lodash';
import debug from 'debug';

import {
  GAME_ITEM_COUNT,
  GAME_ITEM_SIZE,
  GAME_INITIAL_COORDS,
} from 'shared/constants';

debug.enable('helpers');

/* eslint-disable */
export function shuffleArray(oldArr) {
  const arr = cloneDeep(oldArr);
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
}
/* eslint-enable */

export function tryMove(i, coords) {
  let newCoords = false;

  if (isNaN(i)) {
    throw new Error('Misuse of tryMove! pass an integer');
  }

  // current item coords
  const { x, y } = coords[i];
  // empty item coords
  const { x: ex, y: ey } = coords[GAME_ITEM_COUNT];
  // debug('GameSolo')(`will try to move: ${i}`);
  // debug('GameSolo')(`${x}x${y}`);
  // debug('GameSolo')(`${ex}x${ey}`);

  // find interception as
  // oxo
  // xux
  // oxo
  // where u is the clicked target

  // are we on the same line?
  if (y === ey) {
    if (x - GAME_ITEM_SIZE === ex || x + GAME_ITEM_SIZE === ex) {
      newCoords = cloneDeep(coords);
      newCoords[i].x = ex;
      newCoords[GAME_ITEM_COUNT].x = x;
    }
  } else if (x === ex) {
    // it is not on the same line so we check vertically
    if (y - GAME_ITEM_SIZE === ey || y + GAME_ITEM_SIZE === ey) {
      newCoords = cloneDeep(coords);
      newCoords[i].y = ey;
      newCoords[GAME_ITEM_COUNT].y = y;
    }
  }

  return newCoords || false;
}

export function checkWin(coords) {
  let checked = 0;
  debug('helpers')(coords);
  debug('helpers')(GAME_INITIAL_COORDS);

  coords.map((item, index) => {
    const { x, y } = item;
    const { x: victoryX, y: victoryY } = GAME_INITIAL_COORDS[index];

    debug('helpers')(`Item coords vX: ${victoryX} x: ${x}; vY: ${victoryY}, y: ${y}`);
    if (x === victoryX && y === victoryY) {
      checked++;
    }

    return item;
  });

  // we have 16 coords
  debug('helpers')(`Checked: ${checked}, GAME_ITEM_COUNT: ${GAME_ITEM_COUNT}`);
  if (checked === GAME_ITEM_COUNT + 1) {
    debug('helpers')('ITS A WIN! :)');
  }

  return checked === GAME_ITEM_COUNT + 1;
}
