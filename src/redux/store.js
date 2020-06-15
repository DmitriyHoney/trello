import { createStore, combineReducers, applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import listCardReducer from "../reducers/listCard-reducer";

let reducers = combineReducers({
    listCardPage: listCardReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;