import axios from 'axios';
import { Loading } from 'element-ui';
const service = axios.create({
    baseURL: 'http://localhost:5000', // api 的 base_url

})

const loading = null;
function showFullScreenLoading() {
    loading = Loading.service({
        fullscreen: true,
        lock: true,
        text: '努力加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function tryHideFullScreenLoading() {
    loading.close();
}

// 路由请求拦截
// http request 拦截器
service.interceptors.request.use(
    config => {
        //config.data = JSON.stringify(config.data);  
        // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
        // if (cookie.get("token")) {
        //     //用户每次操作，都将cookie设置成2小时
        //     cookie.set("token", cookie.get("token"), 1 / 12)
        //     cookie.set("name", cookie.get("name"), 1 / 12)
        //     config.headers.token = cookie.get("token");
        //     config.headers.name = cookie.get("name");
        // }
        // 请求loading界面
        //showFullScreenLoading();
        return config;
    },
    error => {
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
service.interceptors.response.use(
    response => {
        //tryHideFullScreenLoading();
        if (response.data.resultCode == "404") {
            console.log("response.data.resultCode是404")
            // 返回 错误代码-1 清除ticket信息并跳转到登录页面
            //      cookie.del("ticket")
            //      window.location.href='http://login.com'
            return
        } else {
            return response;
        }
    },
    error => {
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });

export default service;