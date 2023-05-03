import actionTypes from '../actions/actionTypes';
import { LANGUAGES } from '~/utils/constant';
const initContentOfConfirmModal = {
    isOpen: false,
    messageId: '',
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    started: true,
    language: LANGUAGES.VI,
    systemMenuPath: '/home',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal,
    },
    isShowReactLoading: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true,
            };
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal,
                },
            };
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language,
            };
        case actionTypes.CHANGE_STATUS_REACT_LOADING:
            return {
                ...state,
                isShowReactLoading: action.isShowReactLoading,
            };
        default:
            return state;
    }
};

export default appReducer;
