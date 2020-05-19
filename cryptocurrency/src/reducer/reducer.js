import {
  CRYPTO_LIST_FETCH_SUCCESS,
  CRYPTO_PRICE_FETCH_SUCCESS,
  REMOVE_CRYPTO_FROM_TABLE
} from "../actions/actionTypes";

export const initalCryptoCurrencyState = {
  cryptoCurrencies: {},
  tableListIds: [],
}

function getCryptoCurrencies(state = initalCryptoCurrencyState, action) {
  console.log(state);
  console.log(action);
    switch (action.type) {
      case REMOVE_CRYPTO_FROM_TABLE:
        return removeCurrencyFromTable(state, action.payload.id);
      case CRYPTO_LIST_FETCH_SUCCESS:
        return updateCryptoCurrenciesList(state, action.payload.data)
      case CRYPTO_PRICE_FETCH_SUCCESS:
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