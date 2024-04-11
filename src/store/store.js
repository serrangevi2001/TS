import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistedState, saveState } from './persisted.store';
import rootReducer from './reducers';

let middleWares;

switch (process.env.NODE_ENV) {
  case 'development':
    middleWares = composeWithDevTools(thunk);
    break;
  case 'production':
  default:
    middleWares = thunk;
}

const appReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    sessionStorage.clear();
    localStorage.clear();
    state = undefined;
  }

  return rootReducer(state, action);
};

export default function createStore() {
  const store = configureStore({
    reducer: appReducer,
    preloadedState: persistedState,
    middleware: [middleWares],
  });

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
}
