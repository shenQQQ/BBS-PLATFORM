import { SET_GLOBAL_CONFIG } from "../const";

export const setGlobalConfig = (globalConfig) =>{
    return {
        type: SET_GLOBAL_CONFIG,
        globalConfig
    }
}