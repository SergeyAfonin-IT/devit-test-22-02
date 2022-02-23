import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import axiosMiddleware from "./middleware/axios";

const composeEnhancers =
  (process.env.REACT_APP_MODE !== "production" &&
    typeof window !== "undefined" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

export const createStore = (initialState: object = {}) => {
  const middlewares = [thunk, axiosMiddleware];

  return createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
