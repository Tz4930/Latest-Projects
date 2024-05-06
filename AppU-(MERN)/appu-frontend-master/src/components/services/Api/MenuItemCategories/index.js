import axios from "axios";
import apiBaseUrl from "../../../../constant/appConstant"
const api = axios.create({
    baseURL: apiBaseUrl.BACKEND_BASE_URL,
})

export const createMenuItemsCategories = async (item, data) => {
    return await api.post(`/v1/business/menuItemsCategories/${item.businessId}/category`, data)
}

export const deleteMenuItemCategories = async (id) => {
    return await api.delete(`/v1/business/menuItemsCategories/${id}`)
}

export const getMenuItemCategories = async (data) => {
    return await api.post(`/v1/business/menuItemsCategories/${'61962eba7d01aa64deafe800'}/list`, data)
}

export const updateMenuItemsCategories = async (item, data) => {
    return await api.put(`/v1/business/menuItemsCategories/${item.businessId}/${item.id}`, data)
}

export const updateSortCategory = async (item, data) => {
 return await api.put(`/v1/business/menuItemsCategories/${item.id}/sort`, data)
}