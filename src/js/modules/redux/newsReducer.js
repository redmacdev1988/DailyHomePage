// [] array of questions
import * as actions from './actionTypes';

// business logic

// pure function
// called multiplb e times, given same arguments, free of side effects.
// give same results

export default function reducer(state = {}, action) {
    switch(action.type) {
        case actions.NEWS_ADDED:
            console.log('newsReducer.js', action.payload)
            return {
                state: action.payload.news
            }
        default:
                return state;
    }
}