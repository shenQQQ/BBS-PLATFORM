import { combineReducers } from "redux";
import login from "./auth";
import flashMessage from "./flashMessage";

const rootReducer = combineReducers({
    login,
    flashMessage
})

export default rootReducer