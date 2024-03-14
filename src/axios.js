import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

instance.interceptors.request.use(
    (config) => {
        let dataLocalStorage = localStorage.getItem('persist:user');
        const accessToken = !!dataLocalStorage ? JSON.parse(dataLocalStorage)?.access_token : null;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
const refreshAccessToken = async () => {
    try {
        let dataLocalStorage = localStorage.getItem('persist:user');
        let objDataLocalStorage = !!dataLocalStorage ? JSON.parse(dataLocalStorage) : {};
        let refreshToken = objDataLocalStorage?.refresh_token;

        console.log('refresh');
        const response = await instance.post('/api/refresh-token', {
            refreshToken: refreshToken,
        });
        if (response) {
            const newAccessToken = response.accessToken;
            objDataLocalStorage.access_token = `"${newAccessToken}"`;
            localStorage.setItem('persist:user', JSON.stringify(objDataLocalStorage));
            return newAccessToken;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};
let isRefreshing = false;
let failedQueue = [];
instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const { response, config } = error;
        const status = (error && error.response && error.response.status) || 500;
        switch (status) {
            case 401: {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            //----------CODE logout---------\\
                            let dataLocalStorage = localStorage.getItem('persist:user');
                            let objDataLocalStorage = !!dataLocalStorage ? JSON.parse(dataLocalStorage) : {};

                            objDataLocalStorage.isLoggedIn = false;
                            objDataLocalStorage.userInfo = null;
                            objDataLocalStorage.access_token = null;
                            objDataLocalStorage.refresh_token = null;
                            objDataLocalStorage.expiresIn = null;
                            localStorage.setItem('persist:user', JSON.stringify(objDataLocalStorage));
                            //----------------------------------\\
                            failedQueue.push({ resolve, reject });
                        })
                            .then((accessToken) => {
                                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                                return instance(originalRequest);
                            })
                            .catch((err) => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;
                    try {
                        const newAccessToken = await refreshAccessToken();
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        const response = await instance(originalRequest);
                        if (failedQueue.length > 0) {
                            failedQueue.forEach((item) => item.resolve(newAccessToken));
                            failedQueue = [];
                        }

                        return response;
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }
            }

            // forbidden (permission related issues)
            case 403: {
                return Promise.reject(error);
            }

            // bad request
            case 400: {
                return Promise.reject(error);
            }

            // not found
            case 404: {
                return Promise.reject(error);
            }

            // conflict
            case 409: {
                return Promise.reject(error);
            }

            // unprocessable
            case 422: {
                return Promise.reject(error);
            }

            // generic api error (server related) unexpected
            default: {
                return Promise.reject(error);
            }
        }
    },
);

export default instance;
