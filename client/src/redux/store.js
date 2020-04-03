import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";

const INITIAL_STATE = {};
const middleware = [thunk, logger];

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(...middleware)
);

export default store;
