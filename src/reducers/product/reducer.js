import {ADD_PRODUCT, SET_DETAIL_PRODUCTS } from "./constants"

const initState = {
    productsList: [],
    detail: {},
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                productsList:[...state.productsList, action.payload],
            }
        case SET_DETAIL_PRODUCTS: 
            return {
                ...state,
                detail: {
                    ...state.detail,
                    [action.payload.slug]: action.payload
                }
            }
        default: return state
    }
}
