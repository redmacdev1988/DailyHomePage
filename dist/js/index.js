// Global app controller

import x from './test'

import store from './store';
import * as actions from './actionTypes';
import { questionAdded, questionAnswer } from './actions';

console.log("Hello World!"); 

const unsubscribe = store.subscribe( () => {
    console.log('store changed!', store.getState());
});


console.log(`Haaaa doooken 1019!!! index.js - testing 1 2 3`);

const num = 23;
console.log(`src/js/index.js imported ${x} from ./test varialbe num is ${num}`)


