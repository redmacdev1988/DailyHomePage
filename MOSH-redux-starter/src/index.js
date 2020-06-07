import configureStore from './store/configureStore';

import { questionAdded, 
    questionAnswer, 
    getNoAnswerQuestions, 
    questionAssignedToUser,
    getQuestionsByUser
} from './store/questions';

import { projectAdded } from './store/projects';
import { userAdded } from './store/users';


const store = configureStore();

// store.subscribe( () => {
//     console.log('store changed!', store.getState());
// });


//store.dispatch(userAdded({name: "ricky"}));

store.dispatch( (dispatch, getState) => {
    // call api endpoint
    // when promise is resolved => dispatch()

    // if the promise is rejected => dispatch()

    dispatch({
        type: 'questionAdded', 
        questions: "testing 1 2 3"
    });

    console.log(getState());
})
/*
store.dispatch(userAdded({name: "david"})); 

store.dispatch(projectAdded({ name: "Project 1"}));
store.dispatch(questionAdded({
    description: "Question 1",
    answer: 'slow down and stop'
}));
store.dispatch(questionAdded({
    description: "Question 2",
}));
store.dispatch(questionAnswer({
    id: 1,
    answer: 'speed up and honk'
}));

store.dispatch(questionAssignedToUser({
    questionId: 1,
    userId: 1
}));
*/


// let x = getNoAnswerQuestions(store.getState());
// let y = getNoAnswerQuestions(store.getState());

// const questions = getQuestionsByUser(2)(store.getState());
// console.log(questions);

// even though data is different. But we get different objects.

// state change component get re-rendered.
// if we haven't chnaged, we don't want this re-render.

// now filter returns a new array. And the component mistakenly will think that
// the state changed due to filter returning a new object. Hence that's why it re-renders.

// memoization
// optimizing expensive functions
// f(x) => y
// build cache of input and output
// {input: 1, output: 2}

