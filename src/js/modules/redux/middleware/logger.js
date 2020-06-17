import CoronaCases from '../../MyModules/CoronaCases/CoronaCases';
import Weather from '../../MyModules/Weather/Weather';
import News from '../../MyModules/News/index';

// log every action that is dispatched

// sna - store, next, action

const logger = store => next => action => {

    // run the render 
    if (action.type == "coronaAdded") {
        CoronaCases.render(action.payload.cases.cases);
    }

    if (action.type == "weatherAdded") {
        Weather.render(action.payload.description);
    }

    // then 2) gets to logger
    if (action.type == "newsAdded") {
        console.log('logger: ', action.payload);
        News.render(action.payload);
    }
    // Look at state users. Even though in index.js, we dispatched users,
    // those users didn't not end up in our state.

    // the reason why is because we did not call next()

    next(action);
};

export default logger;

// currying - converting function with n parameters into incremental functions

// if we're not using redux toolkit
// and in order to register our middleare
// 