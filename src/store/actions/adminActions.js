import actionTypes from './actionTypes';
// import { updateInforDoctor } from '~/services/doctorService';
import { toast } from 'react-toastify';
import { INFOR_USER } from '~/utils';
import { getAllCodeService, handleGetAllUser } from '~/services/userService';
import { getAllRoom } from '~/services/roomService';
import { getDeviceInRoom } from '~/services/deviceService';

export const fechAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllUser('ALL');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_USER_SUCCESS,
                    data: res.user,
                });
            }
        } catch (error) {
            console.log('GET_ALL_USER_FAILED: ', error);
            dispatch({
                type: actionTypes.GET_ALL_USER_FAILED,
            });
        }
    };
};
//Gender
export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService(INFOR_USER.GENDER);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_GENDER_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_GENDER_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_GENDER_FAILED,
            });
        }
    };
};
export const fetchRole = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService(INFOR_USER.ROLE);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ROLE_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_ROLE_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_ROLE_FAILED,
            });
        }
    };
};
export const fetchMonth = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService(INFOR_USER.MONTH);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_MONTH_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('FETCH_MONTH_FAILED: ', error);
            dispatch({
                type: actionTypes.FETCH_MONTH_FAILED,
            });
        }
    };
};
export const fetchStatusDevice = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService(INFOR_USER.STATUS);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_STATUS_DEVICE_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('GET_STATUS_DEVICE_FAILED: ', error);
            dispatch({
                type: actionTypes.GET_STATUS_DEVICE_FAILED,
            });
        }
    };
};
export const fetchTypeDevice = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService(INFOR_USER.TYPE_DEVICE);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_TYPE_DEVICE_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('GET_TYPE_DEVICE_FAILED: ', error);
            dispatch({
                type: actionTypes.GET_TYPE_DEVICE_FAILED,
            });
        }
    };
};
export const fetchAllRoom = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllRoom(userId);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_ROOM_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('GET_ALL_ROOM_FAILED: ', error);
            dispatch({
                type: actionTypes.GET_ALL_ROOM_FAILED,
            });
        }
    };
};
export const fetchAllDeviceInRoom = (userId, roomId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDeviceInRoom(userId, roomId);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_DEVICE_SUCCESS,
                    data: res.data,
                });
            }
        } catch (error) {
            console.log('GET_ALL_DEVICE_FAILED: ', error);
            dispatch({
                type: actionTypes.GET_ALL_DEVICE_FAILED,
            });
        }
    };
};
