import * as auth from '../actions/auth';
import { merge } from 'lodash';

const user = {
    name: '-',
};

export default (state = { user }, action) => {
    switch(action.type) {
        case auth.LOGIN:
            return { ...state, ...action.payload, check: true };
        case auth.LOGOUT:
            return { ...state, user, check: false };
        case auth.UPDATE:
            return merge({}, state, action.payload);
        default:
            return state;
    }
}
