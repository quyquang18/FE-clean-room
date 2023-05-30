import axios from '../axios';

const getDeviceInRoom = (companyId, roomId) => {
    return axios.get(`/api/get-device-in-room?companyId=${companyId}&roomId=${roomId}`);
};
const getAllInfoDeviceByCompany = (companyId) => {
    return axios.get(`/api/get-all-device?companyId=${companyId}`);
};
const handleUpdateDevice = (data) => {
    return axios.put('/api/update-device', data);
};
const handleCreateNewDevice = (data) => {
    return axios.post('/api/create-new-device', data);
};

const handleGetValueSensor = (companyId, locationId, type, value, startDate, endDate) => {
    return axios.get(
        `/api/get-value-sensor?companyId=${companyId}&locationId=${locationId}
                                &type=${type}&value=${value}&startDate=${startDate}&endDate=${endDate}`,
    );
};
const handleDeleteDevice = (id) => {
    return axios.delete(`/api/delete-device?id=${id}`);
};
const handleGetStatusDevice = (companyId, deviceId, roomId, type, date) => {
    return axios.get(
        `/api/get-status-device?companyId=${companyId}&deviceId=${deviceId}&roomId=${roomId}&type=${type}&date=${date}`,
    );
};
const handleGetValueThreshold = (data) => {
    return axios.get(
        `/api/get-value-threshold?companyId=${data.companyId}&roomId=${data.roomId}&Type_sensor=${data.Type_sensor}`,
    );
};
const handleUpdateValueThreshold = (data) => {
    return axios.post(`/api/update-value-threshold`, data);
};
export {
    getDeviceInRoom,
    handleUpdateDevice,
    handleCreateNewDevice,
    handleDeleteDevice,
    handleGetStatusDevice,
    handleGetValueSensor,
    getAllInfoDeviceByCompany,
    handleGetValueThreshold,
    handleUpdateValueThreshold,
};
