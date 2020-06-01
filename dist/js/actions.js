import * as actions from './actionTypes';


export const questionAdded = description => ({
    type: actions.QUESTION_ADDED,
    payload: {
        description
    }
});

export const questionAnswer = (id, answer) => ({
    type: actions.QUESTION_ANSWER,
    payload: {
        id,
        answer
    }
});