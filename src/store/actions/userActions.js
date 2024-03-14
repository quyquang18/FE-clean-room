import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});
export const userLoginSuccess = (userInfo, accessToken, refreshToken, expiresIn) => {
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        userInfo: userInfo,
        accessToken,
        refreshToken,
        expiresIn,
    };
};
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});
