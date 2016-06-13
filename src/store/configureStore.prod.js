import { createStore, compose } from 'redux';
//import persistState from 'redux-localstorage';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(
      // Add other middleware on this line...
      //persistState([>paths, config<])
    )
  );
}
