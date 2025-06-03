import { SET_CURRENT_USER } from "./constants"

const initState = {
    currentUser: null,
    isLoading: false
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser:action.payload,
                isLoading: false
            }

        default: return state
    }
}