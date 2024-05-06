import axios from "axios";
import apiBaseUrl from "../../../../constant/appConstant"
const api = axios.create({
    baseURL: apiBaseUrl.BACKEND_BASE_URL,
})

export const createBusinessCategories = async (data) => {
    return await api.post('/v1/business/categories/category', data)
}

export const deleteBusinessCategories = async (id) => {
    return await api.delete(`/v1/business/categories/${id}`)
}

export const getBusinessCategories = async () => {
    return await api.post('/v1/business/categories/list')
}

export const updateBusinessCategories = async (item, data) => {
    return await api.put(`/v1/business/categories/${item.businessId}/${item.id}`, data)
}