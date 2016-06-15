import * as types from '../constants/actionTypes';

export function save(name, personalStock) {
  return {type: types.SAVE, name, personalStock};
}
