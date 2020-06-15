import * as actions from './actionTypes';

// export const coronaAdded = cases => ({
//     type: actions.CORONA_ADDED,
//     payload: {
//         cases
//     }
// });

export const coronaAdded = cases => {
    return {
        type: actions.CORONA_ADDED,
        payload: {
            cases
        }
    };
}



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

export const weatherAdded = weatherData => ({
    type: actions.WEATHER_ADDED,
    payload: {
        description: weatherData
    }
});