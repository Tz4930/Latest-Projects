import axios from "axios";
import apiBaseUrl from '../../../../constant/appConstant';

const api = axios.create({
    baseURL:apiBaseUrl.BACKEND_BASE_URL,
})

// getBusinessCategories
//   createBusinessCategories