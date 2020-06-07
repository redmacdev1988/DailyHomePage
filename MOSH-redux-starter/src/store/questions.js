import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
    name: 'questions',
    initialState: [],
    reducers: {

        questionAssignedToUser:(questions, action) => {
            const { questionId, userId } = action.payload;
            const index = questions.findIndex(question => question.id === questionId);
            questions[index].userId = userId;
        },

        // actions => action handlers
        questionAdded: (state, action) => {
            state.push({ 
                id: ++lastId,
                description: action.payload.description,
                answer: action.payload.answer
            });
        }, 

        questionAnswer: (state, action) => {
            const index = state.findIndex(question => question.id === action.payload.id);
            state[index].answer = action.payload.answer;
        }
    }
});

/*
// selector - take state, return computed state
export const getNoAnswerQuestions = state => 
    state.entities.questions.filter(question => !question.answer);
*/

export const getNoAnswerQuestions = createSelector(
    state => state.entities.questions,
    questions => questions.filter(question => !question.answer)
)

export const getQuestionsByUser = userId => createSelector(
    state => state.entities.questions,
    questions => questions.filter(question => question.userId === userId)
)

export const { questionAdded, questionAnswer, questionAssignedToUser } = slice.actions;
export default slice.reducer;

// Building block that can run side effects

// Middleware is a piece of code after an action is dispatched
// and BEFORE it reaches the root reducer

// middleware examples
// apis
// error reporting
// analytics
// authorization
// log






