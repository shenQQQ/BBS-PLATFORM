import { message } from 'antd';
import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:8080'
});

Axios.interceptors.response.use(
    res => {
        //console.log(res);
        // 如果返回的code是311，则表示token有问题，直接把登录信息清除
        if (res.data && res.data.code === 311) {
            localStorage.removeItem("BBSToken");
            window.location.reload();
        } 
        else if (res.data.code !== 200) {
            message.error(res.data.message)
        }
        return res;
    }
);

export default Axios