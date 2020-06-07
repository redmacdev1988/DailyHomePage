import CoronaCases from '../../CoronaCases';
import Weather from '../../Weather';

// log every action that is dispatched

// sna - store, next, action

const logger = store => next => action => {
    console.log(`--- logger ----`);

    //console.log("store", store);
    //console.log("next", next);
    console.log("action", action);

    // run the render 
    if (action.type == "coronaAdded") {
        console.log('logger.js - action type is coronaAdded', action.payload.cases.cases);
        CoronaCases.render(action.payload.cases.cases);
    }

    if (action.type == "weatherAdded") {
        Weather.render(action.payload.description);
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