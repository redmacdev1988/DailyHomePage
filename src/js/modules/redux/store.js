import { createStore } from 'redux';
import { combineReducers } from 'redux'
import reducer from './reducer';
import weatherReducer from './weatherReducer';

const store = createStore(combineReducers({
    reducer, 
    weatherReducer
}));

export default store;