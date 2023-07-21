import axios from 'axios';
import NProgress from 'nprogress';
import {BASE_URL} from '@/constants';

export const $api = () => {
    const instance = axios.create({
        baseURL: BASE_URL
    });

    instance.defaults.headers['Accept'] = 'application/json';
    instance.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk3ZDBkYTBiODA2OTU1OGMyNmQwNjVkZmE1YzJiZSIsInN1YiI6IjY0YWY5ZGE0OGEwZTliMDExZDhlMjg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x0zykKfoB5-nxPCq9sdey5IYOJBC5zi8wsxHE7nvaKg';

    instance.interceptors.response.use(response => {
        NProgress.done();
        return response
    }, error => {
        NProgress.done();
        console.log(error);
    })

    instance.interceptors.request.use(function (config) {
        NProgress.start();

        return config;
    }, function (error) {

        NProgress.done();
        console.error(error)
        return Promise.reject(error);
    });


    return instance;
}