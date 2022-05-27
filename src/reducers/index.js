import { combineReducers } from "redux";
import login from "./auth";
import flashMessage from "./flashMessage";
import config from "./config";
import globalConfig from "./globalConfig";

const rootReducer = combineReducers({
    login,
    flashMessage,
    config,
    globalConfig
})

export default rootReducer