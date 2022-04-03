import setHeaderToken from '../utils/setHeaderToken';
import { setCurrentUser } from '../actions/authActions';
import { store } from '../const/store';
import Axios from './axios';

export default function authByLocalStorageToken() {
    const user = {
        username: "",
        id : "",
        avatar : "",
    }
    if (localStorage.BBSToken) {
        Axios.post("/token", localStorage.BBSToken).then((res) => {
            const token = res.data.content.token;
            localStorage.setItem("BBSToken", token);
            setHeaderToken(token);
            user.username = res.data.content.user.username
            user.id = res.data.content.user.id
            user.avatar = res.data.content.user.avatar
            store.dispatch(setCurrentUser(user))
        }).catch(error => {
            console.log(error);
        })
    } else {
        store.dispatch(setCurrentUser(user))
    }
    store.dispatch(setCurrentUser(user))
}