import Axios from "../utils/axios";

export const userSignupRequest = (userData) => {
    return dispatch => {
        return Axios.post("/signup", userData)
    }
}