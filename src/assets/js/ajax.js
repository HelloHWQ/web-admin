import axios from 'axios';
import router from '../../router.js'
import { Loading } from 'element-ui';

let loading = null;
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

let instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        showFullScreenLoading();
        return config;
    },
    error => {
        console.log(error);
        console.log('请求拦截器报错');
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        tryHideFullScreenLoading();
        // 处理服务端正常返回的错误信息
        if (response.data.code == '404') {
            router.replace({ path: '/404' });
        } else if (response.data.code == '500') {
            router.replace({ path: '/error' });
        }
        return response;
    },
    error => {
        tryHideFullScreenLoading();
        // 处理http错误返回例如：404、500
        router.replace({ path: '/error' });
        console.log(error)
    }
);

export default instance;