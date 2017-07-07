/*
 *
 * Game reducer
 *
 */

import { fromJS } from 'immutable';
import LocalStorageHelper from 'utils/localStorageHelper';
import {
  NAME_SET_ACTION,
  PLAYER_NAME_KEY_IN_LOCALSTORAGE,
} from './constants';

const initialState = fromJS({
  name: LocalStorageHelper.getStorageItem(PLAYER_NAME_KEY_IN_LOCALSTORAGE),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case NAME_SET_ACTION:
      return state.set('name', action.name);
    default:
      return state;
  }
}

export default appReducer;
