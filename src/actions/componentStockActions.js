import * as types from '../constants/actionTypes';

export function save(settings) {
  return {type: types.SAVE, settings};
}
