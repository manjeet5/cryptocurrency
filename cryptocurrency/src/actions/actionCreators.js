import {REMOVE_CURRENCY_FROM_TABLE, ADD_CURRENCY_TO_TABLE, SET_ERROR, HIDE_ERROR} from "./actionTypes";

export const removeCurrencyFromTable = (dispatch) => {
    return (id) => dispatch({type: REMOVE_CURRENCY_FROM_TABLE, payload: {id}})
};

export const addCurrencyToTable = (dispatch) => {
    return (id) => dispatch({type: ADD_CURRENCY_TO_TABLE, payload: {id}})
}

export const setError = (error) => ({
type: SET_ERROR,
error
})
 
export const hideError = () => ({
type: HIDE_ERROR
});