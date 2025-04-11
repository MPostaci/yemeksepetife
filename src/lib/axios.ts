import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44335/api',
    withCredentials: true,
});

export default axiosInstance;