import axios from '../axios';

const createNewRoom = (data) => {
    return axios.post(`/api/create-new-room`, data);
};
const getAllRoom = (userId) => {
    return axios.get(`/api/get-all-room?userId=${userId}`);
};

const getDetailRoomById = (id) => {
    return axios.get(`/api/get-detail-room-by-id?id=${id}`);
};
const getValueSensorByTime = (type, userId, roomId, date) => {
    return axios.get(`/api/get-value-sensor-by-date?type=${type}&userId=${userId}&roomId=${roomId}&date=${date}`);
};

export { createNewRoom, getAllRoom, getDetailRoomById, getValueSensorByTime };
