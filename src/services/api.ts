import axios, { type AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL:"https://fakestoreapi.com/",
});

