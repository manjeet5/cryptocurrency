import {
  CRYPTO_LIST_FETCH_SUCCESS,
  CRYPTO_PRICE_FETCH_SUCCESS,
  REMOVE_CRYPTO_FROM_TABLE_LIST,
  DROPDOWN_CONTENT_CREATE,
  REMOVE_CRYPTO_FROM_DROPDOWN,
  ADD_CRYPTO_TO_DROPDOWN
} from "../actions/actionTypes";

export const initalCryptoCurrencyState = {
  cryptoCurrencies: {},
  tableListIds: [],
  dropdown: {}
}

function cryptoCurrenciesReducer(state = initalCryptoCurrencyState, action) {
  console.log(state);
  console.log(action);
    switch (action.type) {
      case REMOVE_CRYPTO_FROM_DROPDOWN:
        return removeCryptoFromDropdown(state, action.payload.id);
      case ADD_CRYPTO_TO_DROPDOWN:
        return addCryptoToDropdown(state, action.payload.id);
      case REMOVE_CRYPTO_FROM_TABLE_LIST:
        return removeCurrencyFromTable(state, action.payload.id);
      case CRYPTO_LIST_FETCH_SUCCESS:
        return processCryptoCurrenciesList(state, action.payload.data)
      case CRYPTO_PRICE_FETCH_SUCCESS:
        return updateCryptoPrices(state, action.payload.data);
      case DROPDOWN_CONTENT_CREATE:
        return createDropDown(state, action.payload.data)
      default:
        return state
    }
  }

const processCryptoCurrenciesList = (state, list) => {
  const cryptoCurrencies = list.reduce((cryptoCurrencies, currency) => {
    const {name, id, symbol, rank:cmc_rank} = currency;
    return {
      ...cryptoCurrencies,
      [id]:{name, id, symbol, cmc_rank}
    };
  }, {});
  return {
    ...state,
    cryptoCurrencies
  }
}

const createDropDown = (state, list) => {
  console.log(state);
  const dropdown = list.reduce((dropdown, currency) => {
    const {name, id} = currency;
    const categoryName  = name[0].toUpperCase();
    const categoryList = dropdown[categoryName] || [];
    return {
      ...dropdown,
      [categoryName]: [...categoryList, {name, id: id.toString()}]
    };
  }, {})
  return {
    ...state,
    dropdown
  }
}

const removeCryptoFromDropdown = (state, id) => {
  const {name} = state.cryptoCurrencies[id];
  const category = name[0];
  const newCategoryList = state.dropdown[category].filter(currency => {
    return currency.id !== id
  })
  const dropdown = {
    ...state.dropdown,
    [category]: newCategoryList
  };

  return {
    ...state,
    dropdown
  }
}

const addCryptoToDropdown = (state, id) => {
  const {name} = state.cryptoCurrencies[id];
  const category = name[0];
  const dropdown = {
    ...state.dropdown,
    [category]: [...state.dropdown[category], {name, id}]
  };

  return {
    ...state,
    dropdown
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

export default cryptoCurrenciesReducer;