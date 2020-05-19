import {REMOVE_CRYPTO_FROM_TABLE, ADD_CRYPTO_TO_TABLE, SET_ERROR, HIDE_ERROR, CRYPTO_LIST_FETCH_SUCCESS, CRYPTO_PRICE_FETCH_SUCCESS, CRYPTO_LIST_FETCH_REQUEST} from "./actionTypes";

export const getCryptoList = () => ({
    type: CRYPTO_LIST_FETCH_REQUEST, payload: {initialLoad: true}
})
export const removeCurrencyFromTable = (dispatch) => {
    return (id) => dispatch({type: REMOVE_CRYPTO_FROM_TABLE, payload: {id}})
};

export const addCurrencyToTable = (dispatch) => {
    return (id) => dispatch({type: ADD_CRYPTO_TO_TABLE, payload: {id}})
}

export const setCryptoList = (data) => ({
    type: CRYPTO_LIST_FETCH_SUCCESS, payload: {data}
});

export const setCryptoPrices = (data) => ({
    type: CRYPTO_PRICE_FETCH_SUCCESS, payload: {data}
})

export const setError = (error) => ({
type: SET_ERROR,
error
})
 
export const hideError = () => ({
type: HIDE_ERROR
});