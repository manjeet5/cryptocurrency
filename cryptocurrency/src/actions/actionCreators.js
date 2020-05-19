import {REMOVE_CRYPTO_FROM_TABLE, ADD_CRYPTO_TO_TABLE, SET_ERROR, HIDE_ERROR, CRYPTO_LIST_FETCH_SUCCESS, CRYPTO_PRICE_FETCH_SUCCESS, CRYPTO_LIST_FETCH_REQUEST, DROPDOWN_CONTENT_CREATE, REMOVE_CRYPTO_FROM_DROPDOWN, REMOVE_CRYPTO_FROM_TABLE_LIST, ADD_CRYPTO_TO_DROPDOWN} from "./actionTypes";

export const getCryptoList = () => ({
    type: CRYPTO_LIST_FETCH_REQUEST, payload: {initialLoad: true}
})
export const removeCryptoFromTable = (id) => ({
    type: REMOVE_CRYPTO_FROM_TABLE, payload: {id}
})
export const removeCryptoFromTableList = (payload) => ({
    type: REMOVE_CRYPTO_FROM_TABLE_LIST, payload
})

export const addCurrencyToTable = (dispatch) => {
    return (id) => dispatch({type: ADD_CRYPTO_TO_TABLE, payload: {id}})
}

export const setCryptoList = (data) => ({
    type: CRYPTO_LIST_FETCH_SUCCESS, payload: {data}
});

export const setCryptoPrices = (data) => ({
    type: CRYPTO_PRICE_FETCH_SUCCESS, payload: {data}
})

export const setDropdown = (data) => ({
    type: DROPDOWN_CONTENT_CREATE, payload: {data}
});

export const removeCryptoFromDropdown = (payload) => ({
    type: REMOVE_CRYPTO_FROM_DROPDOWN, payload
})
export const addCryptoToDropdown = (payload) => ({
    type: ADD_CRYPTO_TO_DROPDOWN, payload
});

export const setError = (error) => ({
type: SET_ERROR,
error
})
 
export const hideError = () => ({
type: HIDE_ERROR
});