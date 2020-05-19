import {
  ADD_CURRENCY_TO_TABLE,
  CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED,
  CRYPTO_CURRENCY_LIST_FETCH_FAILED,
  CRYPTO_CURRENCY_PRICE_FETCH_FAILED,
  CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED
} from "../actions/actionCreators";

function getCryptoCurrencies(state = {}, action) {
  console.log(action);
    switch (action.type) {
      case ADD_CURRENCY_TO_TABLE:
        return state;
      case CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED:
        console.log("update list")
        return state;
      case CRYPTO_CURRENCY_LIST_FETCH_FAILED:
        console.log("show error")
        return state;
      case CRYPTO_CURRENCY_PRICE_FETCH_FAILED:
        console.log("price fetch failed");
        return state;
      case CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED:
        console.log("price fetch passed");
        return state;
      default:
        return state
    }
  }

export default getCryptoCurrencies;