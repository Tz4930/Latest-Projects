import axios from "axios";
import apiBaseUrl from "../../../../constant/appConstant"
const api = axios.create({
    baseURL: apiBaseUrl.BACKEND_BASE_URL,
})
const uplaodApi = axios.create({
    baseURL: apiBaseUrl.BACKEND_UPLOAD_URL,
})

export const registerBusinees = async (userId, data) => {
    return await api.post(`/v1/business/${userId}`, data)
}

export const getCategoriesList = async () => {
    return await api.post('/v1/business/categories/list', {})
}

export const getBusinesses = async () => {
    return await api.get('/v1/business/business-list')
}
export const getBusinessesById = async (id) => {
    return await api.get(`/v1/business/${id}`)
}
export const getBusinessesByUrlKey = async (urlKey) => {
    return await api.get(`/v1/business/business-by-key/${urlKey}`)
}
export const checkBusinessURLAvailability = async (urlKey) => {
    return await api.get(`/v1/business/url-availability/${urlKey}`)
}

export const deleteBusiness = async (id) => {
    return await api.delete(`/v1/business/${id}`)
}
export const getBusinessByUserId = async (userId) => {
    return await api.get(`/v1/business/${userId}/business`)
}
export const searchBusiness = async(value)=>{
    return await api.get(`/v1/business/search/${value}`)
}
export const updateBusines = async (item, data) => {
    return await api.put(`/v1/business/${item.id}`, data)
}
export const getScrollBusinesses = async (pagelimit,pageno) => {
    return await api.get(`/v1/business/business-list?limit=${pagelimit}&page=${pageno}`)
}


export const filterBusinessCategories = async (value) => {
    return await api.get(`/v1/business/filter/${value}`)
}
export const getCityAreas = async (id) => {
    // return await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${"GhIJY9zDFJvXQEARbn5oixBDUkA"}`,
    // {
    //     headers: {
    //         'Access-Control-Allow-Origin': `https://maps.googleapis.com/maps/api/place/details/json?place_id=${"GhIJY9zDFJvXQEARbn5oixBDUkA"}?key=${"AIzaSyCwbRvbZTkE7DIs2cQ1dveF_Tt3A81FkQ8"}`,
    //         // "Content-Type": "application/json",
    //         Authorization: `Bearer ${"AIzaSyCwbRvbZTkE7DIs2cQ1dveF_Tt3A81FkQ8"}`
    //     }
    // }
    // )
}
export const uploadCoverImage = async (data) => {
    return await uplaodApi.post('/business/image/uploads', data)
}