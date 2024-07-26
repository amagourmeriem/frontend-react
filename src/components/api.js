import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8085", // Remplacez par votre baseURL si différente
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Assurez-vous que le jeton est bien stocké dans le localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;