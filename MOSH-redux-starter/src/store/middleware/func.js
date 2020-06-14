
// SNA
const func = ({dispatch, getState}) => next => action => {
    // we see here that we can extract to see what kind of action this is
    if (typeof action === 'function') {
        action(dispatch, getState);
    } else {
        next(action);
    }
}

export default func;