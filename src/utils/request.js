// Encapsulate Axios
import axios from 'axios'
import { getToken } from './token';

const request = axios.create({
    // Configure root domain
    baseURL: 'http://127.0.0.1',  
    // Set Timeout
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})


// Add a request interceptor
request.interceptors.request.use(function (config) {
    // put token in the request Header
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


  export { request }