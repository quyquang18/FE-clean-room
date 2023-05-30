import axios from '../axios';

const createNewRoom = (data) => {
    return axios.post(`/api/create-new-room`, data);
};
const getAllRoom = (companyId) => {
    return axios.get(`/api/get-all-room?companyId=${companyId}`);
};

const getDetailRoomById = (id) => {
    return axios.get(`/api/get-detail-room-by-id?id=${id}`);
};
const getValueSensorByTime = (type, companyId, roomId, date) => {
    return axios.get(`/api/get-value-sensor-by-date?type=${type}&companyId=${companyId}&roomId=${roomId}&date=${date}`);
};

export { createNewRoom, getAllRoom, getDetailRoomById, getValueSensorByTime };
