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
const editUserService = (data) => {
    return axios.put(`/api/edit-user`, data);
};
const deleteUserService = (idUser) => {
    return axios.delete(`/api/delete-user`, { data: { id: idUser } });
};
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
};
const handleGetAllUser = (id) => {
    return axios.get(`/api/get-all-users?type=${id}`);
};
const handleUpdateRole = (inputData) => {
    return axios.put(`/api/edit-user`, inputData);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode/?type=${inputType}`);
};
const getDetailUserById = (userId) => {
    return axios.get(`/api/get-detail-user-by-id?id=${userId}`);
};
export {
    handleLoginApi,
    handleVerifyEmail,
    handleRegisterApi,
    handleGetAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getDetailUserById,
    handleUpdateRole,
};
