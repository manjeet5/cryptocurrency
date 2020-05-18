export const REMOVE_CURRENCY_FROM_TABLE = "remove_currency_from_table";
export const ADD_CURRENCY_TO_TABLE = "add_currency_to_table";

export const removeCurrencyFromTable = (dispatch) => {
    return (id) => dispatch({type: REMOVE_CURRENCY_FROM_TABLE})
};

export const addCurrencyToTable = (dispatch) => {
    return (id) => dispatch({type: ADD_CURRENCY_TO_TABLE})
}