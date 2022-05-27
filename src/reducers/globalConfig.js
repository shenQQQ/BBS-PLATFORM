import { SET_GLOBAL_CONFIG } from "../const";

const getGlobalConfig = (state = {},action) =>{
    switch(action.type){
        case SET_GLOBAL_CONFIG:
            return {
                globalConfig: action.globalConfig
            }
        default:
            return state;
    }
}
export default getGlobalConfig;