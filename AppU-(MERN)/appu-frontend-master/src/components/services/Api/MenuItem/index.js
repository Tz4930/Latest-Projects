import axios from "axios";
import apiBaseUrl from "../../../../constant/appConstant"
const api = axios.create({
    baseURL: apiBaseUrl.BACKEND_BASE_URL,
})
const uplaodApi = axios.create({
    baseURL: apiBaseUrl.BACKEND_UPLOAD_URL,
})
export const createMenuItems = async (data) => {
    return await api.post('/v1/business/menuItems/menu', data)
}

export const getMenuItems = async (data) => {
    return await api.post('/v1/business/menuItems/menuItems-list', data)
}

export const deleteMenuItem = async (id) => {
    return await api.delete(`/v1/business/menuItems/${id}`)
}

export const getMenuItemCategories = async (businessId) => {
    return await api.post(`/v1/business/menuItemsCategories/${businessId}/list`)
}

export const updateMenuItems = async (item, data) => {
    return await api.put(`/v1/business/menuItems/${item.id}`, data)
}

export const uploadMenuItemImage = async (data) => {
    return await uplaodApi.post('/business/image/uploads', data)
}

export const updateSortmenuItems = async (item, data) => {
    return await api.put(`/v1/business/menuItemsCategories/${item.id}/sort`, data)
   }