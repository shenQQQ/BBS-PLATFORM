import { SET_CURRENT_USER } from "../const";
import Axios from "../utils/axios";
import setHeaderToken from "../utils/setHeaderToken";

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

const user = {
    username: "",
    id : "",
    avatar : "",
}
export const logout = () =>{
    return dispatch => {
        localStorage.removeItem("BBSToken");
        setHeaderToken(user);
        dispatch(setCurrentUser(user));
    }
}

export const login = (data) => {
    return dispatch => {
        return Axios.post("/login", data)
    }
}