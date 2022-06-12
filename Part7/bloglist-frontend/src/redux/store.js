/* eslint-disable import/no-extraneous-dependencies */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogreducers';
import notificationReducer from './reducers/notificationReducers';
import userReducer from './reducers/userreducers';

const reducer = combineReducers(
  {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
