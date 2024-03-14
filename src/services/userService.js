import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
};
const handleVerifyEmail = (id, token) => {
    return axios.get(`/api/user/${id}/verify/${token}`);
};
const handleRegisterApi = (data) => {
    return axios.post(`/api/create-new-user`, data);
};
const handleUpdateRoleUser = (data) => {
    return axios.put(`/api/update-role-user`, data);
};
const handleUpdateImageAvatar = (data) => {
    return axios.post(`/api/update-avatar-user`, data);
};
const handleChangePassWord = (data) => {
    return axios.put(`/api/change-password`, data);
};
const handleEditInforUser = (data) => {
    return axios.put(`/api/edit-infor-user`, data);
};
const apiRegisterCompany = (data) => {
    return axios.post('/api/create-new-company', data);
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
const handleGetListCompany = (type) => {
    return axios.get(`/api/list-company?type=${type}`);
};
const apiConfirmCompany = (data) => {
    return axios.post(`/api/confirm-company`, data);
};
const getNotifycations = (data) => {
    return axios.get(`/api/get-notifycation?userId=${data.userId}&companyId=${data.companyId}`);
};
const getAllUserByCompany = (id) => {
    return axios.get(`/api/get-all-users-by-company?companyId=${id}`);
};
const apiConfirmUserByCompany = (data) => {
    return axios.post(`/api/confirm-by-company`, data);
};
const sendNotificationsWarning = (data) => {
    return axios.post(`/api/send-notifications-warning`, data);
};
export {
    handleLoginApi,
    handleVerifyEmail,
    handleRegisterApi,
    handleGetAllUser,
    createNewUserService,
    deleteUserService,
    getAllCodeService,
    getDetailUserById,
    handleUpdateRole,
    apiRegisterCompany,
    handleGetListCompany,
    apiConfirmCompany,
    getNotifycations,
    getAllUserByCompany,
    apiConfirmUserByCompany,
    sendNotificationsWarning,
    handleChangePassWord,
    handleEditInforUser,
    handleUpdateImageAvatar,
    handleUpdateRoleUser,
};
