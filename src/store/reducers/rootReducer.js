import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import appReducer from './appReducer';
import userReducer from './userReducer';
import storage from 'redux-persist/lib/storage';
import adminReducer from './adminReducer';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo', 'access_token', 'refresh_token'],
};
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language'],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (history) =>
    combineReducers({
        router: connectRouter(history),
        user: persistReducer(userPersistConfig, userReducer),
        app: persistReducer(appPersistConfig, appReducer),
        admin: adminReducer,
    });
