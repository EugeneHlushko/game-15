export const GAME_ITEM_COUNT = 15;
export const GAME_ITEM_SIZE = 32;
export const GAME_COLS = 4;
export const GAME_INITIAL_COORDS = Array.from(new Array(16), (val, index) => index + 1).map((item) => indexToCoord(item - 1));

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