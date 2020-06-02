// [] array of questions
import * as actions from './actionTypes';

// business logic

// pure function
// called multiplb e times, given same arguments, free of side effects.
// give same results

export default function reducer(state = {}, action) {
    switch(action.type) {
        case actions.WEATHER_ADDED:
            console.log('WEATHER_ADDED');
            return {
                state: action.payload.description
            }
        default:
                return state;
    }
}