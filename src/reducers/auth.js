import { SET_CURRENT_USER } from "../const";
import isEmpty from "lodash/isEmpty"

const initialState = {
    user : {},
    isAuth : false
}

const login = (state = {},action) =>{
    //console.log("auth中的action值 ", action.user)
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                user: action.user,
                isAuth: !isEmpty(action.user.username)
            }
        default:
            return state;
    }
}
export default login;