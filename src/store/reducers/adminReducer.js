import actionTypes from '../actions/actionTypes';
const initialState = {
    arrUser: [],
    roles: [],
    genders: [],
    arrRoom: [],
    arrMonth: [],
    arrDevice: [],
    arrStatus: [],
    arrTypeDevice: [],
};
const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.arrUser = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_ALL_USER_FAILED:
            state.arrUser = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_MONTH_SUCCESS:
            state.arrMonth = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_MONTH_FAILED:
            state.arrMonth = [];
            return {
                ...state,
            };
        case actionTypes.GET_ALL_ROOM_SUCCESS:
            state.arrRoom = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_ALL_ROOM_FAILED:
            state.arrRoom = [];
            return {
                ...state,
            };
        case actionTypes.GET_ALL_DEVICE_SUCCESS:
            state.arrDevice = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_ALL_DEVICE_FAILED:
            state.arrDevice = [];
            return {
                ...state,
            };
        case actionTypes.GET_STATUS_DEVICE_SUCCESS:
            state.arrStatus = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_STATUS_DEVICE_FAILED:
            state.arrStatus = [];
            return {
                ...state,
            };
        case actionTypes.GET_TYPE_DEVICE_SUCCESS:
            state.arrTypeDevice = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_TYPE_DEVICE_FAILED:
            state.arrTypeDevice = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
