import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});



//  Request intersepter

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ya jahan bhi aap token store karte ho
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error) => {
        if (error.response?.status === 401){
            window.location.href = "/Login";
        }

        return Promise.reject(error);
    }
)
export default api;
