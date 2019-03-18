import cookie from 'js-cookie';
export const LOGIN = 'login',
    LOGOUT = 'logout',
    UPDATE = 'update auth user';

export const login = payload => ({ type: LOGIN, payload });

export const logout = () => {
    cookie.session(null);
    return { type: LOGOUT };
};

export const update = payload => ({ type: UPDATE, payload });