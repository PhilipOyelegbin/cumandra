import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://cumandra-api.herokuapp.com",
});
