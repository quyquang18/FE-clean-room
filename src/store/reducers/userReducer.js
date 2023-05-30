import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    access_token: null,
    refresh_token: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                access_token: action.accessToken,
                refresh_token: action.refreshToken,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                access_token: null,
                refresh_token: null,
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                access_token: null,
                refresh_token: null,
            };
        default:
            return state;
    }
};

export default userReducer;
