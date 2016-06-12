// This is just a stand in. We'll write proper reducers later

//import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/actionTypes';
//import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function eliteEngineersReducer(state = initialState.eliteEngineers, action) {
  switch (action.type) {
    //case SAVE_FUEL_SAVINGS:
      //// For this example, just simulating a save by changing date modified.
      //// In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      //return objectAssign({}, state, {dateModified: dateHelper.getFormattedDateTime(new Date())});

      //return newState;

    default:
      return state;
  }
}
