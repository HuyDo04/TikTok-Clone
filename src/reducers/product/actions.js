import productService from "@/service/productService";
import { ADD_PRODUCT, GET_DETAIL_PRODUCTS, SET_DETAIL_PRODUCTS } from "./constants";

export const addProduct = (payload) => ({
    type: ADD_PRODUCT,
    payload
})

export const getDetailProduct = (slug) => {
    return async (dispatch) => {
        dispatch({
            type: GET_DETAIL_PRODUCTS
        })
        try {
            const product = await productService.getOne(slug);
            dispatch(setDetailProduct(product.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const setDetailProduct = (payload) => ({
    type: SET_DETAIL_PRODUCTS,
    payload
})