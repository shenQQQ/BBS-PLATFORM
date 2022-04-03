import axios from 'axios';
import { LocalStorageTokenName, ServerUrl} from '../config/config';

const Axios = axios.create({
    baseURL: ServerUrl
});

Axios.interceptors.response.use(
    res => {
        //console.log(res);
        // 如果返回的code是311，则表示token有问题，直接把登录信息清除
        if (res.data && res.data.code === 311) {
            localStorage.removeItem(LocalStorageTokenName);
            window.location.reload();
        } 
        return res;
    }
);

export default Axios