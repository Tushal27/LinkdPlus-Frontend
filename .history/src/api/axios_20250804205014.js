import axios from "axios";

const api = axios.create({
    baseURL: 'https://linkdplus-backen.onrender.com/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        console.log("token");
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
    

