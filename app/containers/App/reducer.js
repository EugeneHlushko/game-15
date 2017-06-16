/*
 *
 * Game reducer
 *
 */

import { fromJS } from 'immutable';
import {
  NAME_SET_ACTION,
} from './constants';

const initialState = fromJS({
  name: '',
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
