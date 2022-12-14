import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};
const handleVerifyEmail = (id, token) => {
    return axios.get(`/api/user/${id}/verify/${token}`);
};
const handleRegisterApi = (data) => {
    return axios.post(`/api/create-new-user`, {
        email: data.email,
        username: data.username,
        password: data.password,
        phonenumber: data.phonenumber,
    });
};
const handleGetAllUser = (inputType) => {
    return axios.get(`/api/get-all-users?type=${inputType}`);
};
const handleUpdateRole = (inputData) => {
    return axios.put(`/api/edit-user`, inputData);
};
export { handleLoginApi, handleVerifyEmail, handleRegisterApi, handleGetAllUser, handleUpdateRole };
