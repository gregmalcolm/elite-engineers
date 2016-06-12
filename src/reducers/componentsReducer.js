import {SAVE} from '../constants/actionTypes';

import objectAssign from 'object-assign';
import initialState from './initialState';

import dateHelper from '../utils/dateHelper';

export default function componentsReducer(state = initialState.components, action) {
  switch (action.type) {
    case SAVE:
      // Make a copy because you can't change state
      return objectAssign({}, state, {updatedAt: dateHelper.getFormatedDateTime(new Date())});
    default:
      return state;
  }
}
