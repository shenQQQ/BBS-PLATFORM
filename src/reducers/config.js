import { SET_CONFIG } from "../const";

const getconfig = (state = {},action) =>{
    switch(action.type){
        case SET_CONFIG:
            return {
                config: action.config
            }
        default:
            return state;
    }
}
export default getconfig;