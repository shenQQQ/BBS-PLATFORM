import { SET_CONFIG } from "../const"

export const setConfig= (config) => {
    return {
        type: SET_CONFIG,
        config
    }
}