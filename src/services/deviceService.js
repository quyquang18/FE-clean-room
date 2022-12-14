import axios from '../axios';

const handleGetDeviceAPI = (userId, locationId) => {
    return axios.get(`/api/get-device?userId=${userId}&locationId=${locationId}`);
};
const handleUpdateDevice = (id, devicename, typedevice) => {
    return axios.put('/api/update-device', { id, devicename, typedevice });
};
const handleCreateNewDevice = (data) => {
    return axios.post('/api/create-new-device', data);
};
const handleGetLocation = (userId) => {
    return axios.get(`/api//get-location?id=${userId}`);
};
const handleDeleteDevice = (id) => {
    return axios.delete(`/api/delete-device?id=${id}`);
};
const handleGetStatusDevice = (userId, deviceId, locationId, type, value) => {
    return axios.get(
        `/api/get-status-device?userId=${userId}&deviceId=${deviceId}&locationId=${locationId}&type=${type}&value=${value}`,
    );
};
export {
    handleGetDeviceAPI,
    handleUpdateDevice,
    handleCreateNewDevice,
    handleGetLocation,
    handleDeleteDevice,
    handleGetStatusDevice,
};
