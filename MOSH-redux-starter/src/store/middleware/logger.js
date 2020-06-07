// log every action that is dispatched

// sna - store, next, action

// this is how we paramterize middleware function

const logger = param => store => next => action => {
    console.log(`---- logger ------`);
    console.log('Logging', param);
    next(action);
};

export default logger;

// currying - converting function with n parameters into incremental functions

// if we're not using redux toolkit
// and in order to register our middleare
// 