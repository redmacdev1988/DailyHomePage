// [] array of questions
import * as actions from './actionTypes';

let lastId = 0;

// business logic

// pure function
// called multiplb e times, given same arguments, free of side effects.
// give same results

export default function reducer(state = [], action) {

    switch(action.type) {
        case actions.QUESTION_ADDED:
            return [
                ...state,
                { 
                    id: ++lastId,
                    description: action.payload.description,
                    answer: null
                }
            ];

        case actions.QUESTION_REMOVED:
            return state.filter(question => question.id !== action.payload.id);

        case actions.QUESTION_ANSWER: 
            return state.map(question => {
                console.log('question', question);
                if (question.id !== action.payload.id) {
                    return question;
                } else {
                    return  {
                        ...question, 
                        answer: action.payload.answer
                    }
                }
            });
        default:
                return state;
    }
}