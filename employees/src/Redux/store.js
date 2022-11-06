import {applyMiddleware, legacy_createStore,compose} from "redux";
import {reducer} from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store =legacy_createStore(reducer,composeEnhancers(applyMiddleware(thunk)));