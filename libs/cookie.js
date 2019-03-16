import cookie from 'js-cookie';
const SESSION_NAME = 'medium-session';

cookie.session = (value) => {
    if(value !== undefined) {
        cookie.set(SESSION_NAME, value, '/');
    }

    if(value === null) {
        return cookie.remove(SESSION_NAME);
    }

    return cookie.get(SESSION_NAME);
};
