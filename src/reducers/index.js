import { combineReducers } from "redux";
import login from "./auth";
import flashMessage from "./flashMessage";
import config from "./config";

const rootReducer = combineReducers({
    login,
    flashMessage,
    config
})

export default rootReducer