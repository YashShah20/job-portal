import axios from "axios";
import { useAuthStore } from '../store/authStore';

const axiosClient = axios.create({
    baseURL: `http://localhost:3000/`
});

axiosClient.interceptors.request.use(config => {
    const authStore = useAuthStore();
    config.headers.Authorization = authStore.token;
    config.headers.Accept = 'application/json'
    return config
});

export default axiosClient;
