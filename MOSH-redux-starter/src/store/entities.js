import {combineReducers} from 'redux';
import questionsReducer from './questions';
import projectsReducer from './projects';
import usersReducer from './users';

// the idea is that questionsReducer can only update questions
// projectsReducrs can only update projects...etc


export default combineReducers({
    questions: questionsReducer,
    projects: projectsReducer,
    users: usersReducer
})