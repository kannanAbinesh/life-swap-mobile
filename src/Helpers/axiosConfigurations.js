/* Plugins. */
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Helpers. */
import { apiURL } from "../config";

const axiosInstance = axios.create({ baseURL: apiURL, timeout: 10000 });

/* Axios "request" configuration. */
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("id_token");
            if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch (error) { console.error("Error reading token:", error) }
        return config;
    },
    (error) => Promise.reject(error)
);

/* Axios "response" configuration. */
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 402) {
            await AsyncStorage.removeItem("id_token");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;