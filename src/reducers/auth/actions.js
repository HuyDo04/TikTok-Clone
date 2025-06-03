import authService from "@/service/authService"
import { SET_CURRENT_USER } from "./constants";

export const getCurrentUser = () => {
    return async (dispatch) => {
        const user = await authService.getCurrentUser();
        
        dispatch(setCurrentUser(user))
    }
}

export const setCurrentUser = (payload) => {
    return {
        type: SET_CURRENT_USER,
        payload,
    }
}