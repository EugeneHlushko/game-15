/*
 *
 * App actions
 *
 */

import {
  NAME_SET_ACTION,
} from './constants';

export function nameSet(name) {
  return {
    type: NAME_SET_ACTION,
    name,
  };
}
