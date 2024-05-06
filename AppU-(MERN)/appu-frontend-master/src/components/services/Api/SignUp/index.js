import axios from "axios";
import apiBaseUrl from "../../../../constant/appConstant"
const api = axios.create({
    baseURL: apiBaseUrl.BACKEND_BASE_URL,
})

export const createAccount = async (data) => {
    return await api.post('/v1/auth/register', data)
}

export const userLogin = async (data) => {
    return await api.post('/v1/auth/login', data)
}

export const createOrder = async (data) => {
    return await api.post('/v1/business/orders/order', data)
}