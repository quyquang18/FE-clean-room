export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    LOGIN: '/login',
    REGISTER: '/register',
    REGISTER_COMPANY: '/register-company',
    LOG_OUT: '/logout',
    DEVICEMONITOR: '/devicemonitor',
    MONITORCONTROLER: '/monitorcontroler',
    SETTINGS_CONTROLER: '/monitorcontroler/settings-controler',
    PROFILE_USER: '/:nickname/:id',
    MONITOR_ROOM: '/monitor-room',
    MANAGE_ACCOUNT: '/manage-account',
    MANAGE_COMPANY: '/manage-company',
    MANAGE_ROOM: '/manage-room',
    DEVICE_MANAGER: '/devicemanager',
    ADD_DEVICE: '/devicemanager/add-device',
    VERIFY_EMAIL: '/user/:id/verify/:token',
    OTHER: '*',
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en',
};

export const CRUD_ACTIONS = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    READ: 'READ',
    UPDATE: 'UPDATE',
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY',
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N',
};
export const StatusOnOff = {
    ON: 1,
    OFF: 0,
};
export const USER_ROLE = {
    MANAGE_SYSTEM: 'R1',
    ADMIN: 'R2',
    USER: 'R3',
};
export const INFOR_USER = {
    GENDER: 'GENDER',
    POSITION: 'POSITION',
    ROLE: 'ROLE',
    MONTH: 'MONTH',
    STATUS: 'STATUS',
    TYPE_DEVICE: 'TYPE_DEVICE',
    TIME: 'TIME',
    NAME: 'NAME',
};
export const TYPE_DISPLAY = {
    TEMPERATURE_HUMIDITY: 'TEMPERATURE_HUMIDITY',
    PRESSURE: 'PRESSURE',
    DUST: 'DUST',
    OXY: 'OXY',
};
export const TYPE_SENSOR = {
    TEMPERATURE: 'TEMPERATURE',
    HUMIDITY: 'HUMIDITY',
    DEFFERENTIAL_PRESS: 'DEFFERENTIAL_PRESS',
    DUST_25: 'DUST_25',
    DUST_10: 'DUST_10',
    OXY: 'OXY',
};
export const STAUTUS_COMPANY = {
    UNCONFIMRED: 'UNCONFIMRED',
    CONFIRMED: 'CONFIRMED',
};
export const MODAL = {
    MANUAL: 1,
    AUTOMATION: 0,
};
