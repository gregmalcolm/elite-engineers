import { combineReducers } from 'redux';
import componentsReducer from './componentsReducer';

const rootReducer = combineReducers({
  componentsReducer,
  // Add reducers here
});

export default rootReducer;
