import axios from "axios";
import Axios from "./axios";

const setHeaderToken = (token) =>{
    if(token){
        Axios.defaults.headers.common['Authorization'] = token;
    }else{
        delete Axios.defaults.headers.common['Authorization'];
    }
}

export default setHeaderToken