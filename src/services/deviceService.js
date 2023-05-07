import axios from '../axios';

const getDeviceInRoom = (userId, roomId) => {
    return axios.get(`/api/get-device-in-room?userId=${userId}&roomId=${roomId}`);
};
const getAllInfoDeviceByUser = (userId) => {
    return axios.get(`/api/get-all-device?userId=${userId}`);
};
const handleUpdateDevice = (data) => {
    return axios.put('/api/update-device', data);
};
const handleCreateNewDevice = (data) => {
    return axios.post('/api/create-new-device', data);
};
const handleGetLocation = (userId) => {
    return axios.get(`/api//get-location?id=${userId}`);
};
const handleGetValueSensor = (userId, locationId, type, value, startDate, endDate) => {
    return axios.get(
        `/api/get-value-sensor?userId=${userId}&locationId=${locationId}
                                &type=${type}&value=${value}&startDate=${startDate}&endDate=${endDate}`,
    );
};
const handleDeleteDevice = (id) => {
    return axios.delete(`/api/delete-device?id=${id}`);
};
const handleGetStatusDevice = (userId, deviceId, roomId, type, date) => {
    return axios.get(
        `/api/get-status-device?userId=${userId}&deviceId=${deviceId}&roomId=${roomId}&type=${type}&date=${date}`,
    );
};
const handleGetValueThreshold = (data) => {
    return axios.get(
        `/api/get-value-threshold?userId=${data.userId}&roomId=${data.roomId}&Type_sensor=${data.Type_sensor}`,
    );
};
const handleUpdateValueThreshold = (data) => {
    return axios.post(`/api/update-value-threshold`, data);
};
export {
    getDeviceInRoom,
    handleUpdateDevice,
    handleCreateNewDevice,
    handleGetLocation,
    handleDeleteDevice,
    handleGetStatusDevice,
    handleGetValueSensor,
    getAllInfoDeviceByUser,
    handleGetValueThreshold,
    handleUpdateValueThreshold,
};
