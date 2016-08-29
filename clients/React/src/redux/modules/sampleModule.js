// READ: http://redux.js.org/docs/basics/index.html

/**
 * Action Types
 */

export const INCREMENT = 'INCREMENT';

/**
 * Action Creators
 */

export const increment = () => ({ type: INCREMENT });

/**
 * Reducer
 */

const defaultState = {};

const incrementingNumberReducer = (state = defaultState, action) => {
    switch(action.type) {
        case INCREMENT:
            // Return a new state!
            return {
                num: state.num + 1;
            };
        default:
            return state;
    }
}

export default incrementingNumberReducer;
