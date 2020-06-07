
// SNA
const func = ({dispatch, getState}) => next => action => {

    // store - dispatch/getstate
    console.log(`---- func -----`);

    // we see here that we can extract to see what kind of action this is
    console.log('action', action);
    if (typeof action === 'function') {
        action(dispatch, getState);
    } else {
        next(action);
    }
}

export default func;