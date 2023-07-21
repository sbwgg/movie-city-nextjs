import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
}, function (error) {
    // Do something with request error
    NProgress.done();
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    NProgress.done();
    return response;
}, function (error) {
    // Do something with response error
    NProgress.done();
    console.error(error)
    return Promise.reject(error);
});

NProgress.configure({easing: 'linear', speed: 700, showSpinner: false});