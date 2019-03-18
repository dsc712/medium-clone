import * as app from '../actions/app';

export default (state = {}, action) => {
    switch(action.type) {
        case app.LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}