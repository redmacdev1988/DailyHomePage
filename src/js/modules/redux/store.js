import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux'
import reducer from './reducer';
import weatherReducer from './weatherReducer';
import newsReducer from './newsReducer';

import coronaReducer from './coronaReducer';
import logger from './middleware/logger';

const store = createStore(
    combineReducers({
        reducer, 
        weatherReducer,
        coronaReducer,
        newsReducer
    }), 
    applyMiddleware(logger)
);

export default store;