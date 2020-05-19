export const REMOVE_CURRENCY_FROM_TABLE = "remove_currency_from_table";
export const ADD_CURRENCY_TO_TABLE = "add_currency_to_table";
export const CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED = "crypto_currency_list_fetch_succeeded";
export const CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED = "crypto_currency_price_fetch_succeeded";

export const CRYPTO_CURRENCY_LIST_FETCH_FAILED = "crypto_currency_list_fetch_failed";
export const CRYPTO_CURRENCY_PRICE_FETCH_FAILED = "crypto_currency_price_fetch_failed";

export const removeCurrencyFromTable = (dispatch) => {
    return (id) => dispatch({type: REMOVE_CURRENCY_FROM_TABLE, id})
};

export const addCurrencyToTable = (dispatch) => {
    return (id) => dispatch({type: ADD_CURRENCY_TO_TABLE, id})
}