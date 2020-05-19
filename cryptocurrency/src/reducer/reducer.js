import {
  ADD_CURRENCY_TO_TABLE,
  CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED,
  CRYPTO_CURRENCY_LIST_FETCH_FAILED,
  CRYPTO_CURRENCY_LIST_FETCH_REQUESTED,
  CRYPTO_CURRENCY_PRICE_FETCH_FAILED,
  CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED,
  REMOVE_CURRENCY_FROM_TABLE
} from "../actions/actionCreators";

function getCryptoCurrencies(state = {}, action) {
  console.log(action);
    switch (action.type) {
      case ADD_CURRENCY_TO_TABLE:
        return state;
      case REMOVE_CURRENCY_FROM_TABLE:
        return removeCurrencyFromTable(state, action.payload.id);
      case CRYPTO_CURRENCY_LIST_FETCH_REQUESTED: 
        return {
          ...state,
          loading: true
        }
      case CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED:
        return updateCryptoCurrenciesList(state, action.payload.data)
      case CRYPTO_CURRENCY_LIST_FETCH_FAILED:
        console.log("show error")
        return state;
      case CRYPTO_CURRENCY_PRICE_FETCH_FAILED:
        console.log("price fetch failed");
        return state;
      case CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED:
        console.log("price fetch passed");
        return updateCryptoPrices(state, action.payload.data);
      default:
        return state
    }
  }

const updateCryptoCurrenciesList = (state, list) => {
  const cryptoCurrencies = list.reduce((cryptoCurrencies, currency) => {
    const {name, id, symbol, rank:cmc_rank} = currency;
    cryptoCurrencies[id] = {name, symbol, cmc_rank};
    return cryptoCurrencies
  }, {})
  return {
    ...state,
    cryptoCurrencies
  }
}

const updateCryptoPrices = (state, priceData) => {
  const {cryptoCurrencies, tableListIds} = state;
  const newTableListIds = Object.keys(priceData);
  const cryptoCurrenciesWithPrice = newTableListIds.reduce((withPrice,id) => {
      withPrice[id] = { ...cryptoCurrencies[id], price: priceData[id].quote.USD.price}; 
      return withPrice;
  }, {});
  const result = {
    ...state,
    cryptoCurrencies: { ...cryptoCurrencies, ...cryptoCurrenciesWithPrice},
    tableListIds: [...tableListIds, ...newTableListIds],
  }
  return result;
}

const removeCurrencyFromTable = (state, id) => {
  return {
    ...state,
    tableListIds: state.tableListIds.filter(currencyId => currencyId!==id)
  }
}
export default getCryptoCurrencies;