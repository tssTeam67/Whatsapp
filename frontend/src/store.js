import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, loadUserReducer } from "./reducer/userReducer";
import { messageReducer } from "./reducer/messageReducer";

const reducer = combineReducers({
  user: userReducer,

  loadUser: loadUserReducer,
  userMessages: messageReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
