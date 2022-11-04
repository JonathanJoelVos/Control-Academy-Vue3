import axios, { type AxiosInstance } from 'axios'

export const http: AxiosInstance = axios.create({baseURL: 'http://localhost:3333'})
