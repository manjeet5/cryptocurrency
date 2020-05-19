import {
  CRYPTO_LIST_FETCH_SUCCESS,
  CRYPTO_PRICE_FETCH_SUCCESS,
  REMOVE_CRYPTO_FROM_TABLE_LIST,
  DROPDOWN_CONTENT_CREATE,
  REMOVE_CRYPTO_FROM_DROPDOWN,
  ADD_CRYPTO_TO_DROPDOWN,
} from "../actions/actionTypes";

export const initalCryptoCurrencyState = {
  cryptoCurrencies: {},
  tableListIds: [],
  dropdown: {},
};

function cryptoCurrenciesReducer(state = initalCryptoCurrencyState, action) {
  const { payload } = action;
  switch (action.type) {
    case REMOVE_CRYPTO_FROM_DROPDOWN:
      return removeCryptoFromDropdown(state, payload.id);
    case ADD_CRYPTO_TO_DROPDOWN:
      return addCryptoToDropdown(state, payload.id);
    case REMOVE_CRYPTO_FROM_TABLE_LIST:
      return removeCurrencyFromTable(state, payload.id);
    case CRYPTO_LIST_FETCH_SUCCESS:
      return processCryptoCurrenciesList(state, payload.data);
    case CRYPTO_PRICE_FETCH_SUCCESS:
      return updateCryptoPrices(state, payload.data);
    case DROPDOWN_CONTENT_CREATE:
      return createDropDown(
        state,
        payload.data,
        payload.inititalTableRenderList
      );
    default:
      return state;
  }
}

const processCryptoCurrenciesList = (state, list) => {
  const cryptoCurrencies = list.reduce((cryptoCurrencies, currency) => {
    const { name, id, symbol, rank: cmc_rank } = currency;
    return {
      ...cryptoCurrencies,
      [id]: { name, id, symbol, cmc_rank },
    };
  }, {});
  return {
    ...state,
    cryptoCurrencies,
  };
};

const createDropDown = (state, list, inititalTableRenderList) => {
  const dropdown = list.reduce((dropdown, currency) => {
    const { name, id } = currency;
    const categoryName = name[0].toUpperCase();
    const categoryList = dropdown[categoryName] || [];
    const newCategoryList = inititalTableRenderList.includes(id)
      ? categoryList
      : [...categoryList, { name, id: id.toString() }];
    return {
      ...dropdown,
      [categoryName]: newCategoryList,
    };
  }, {});
  return {
    ...state,
    dropdown,
  };
};

const removeCryptoFromDropdown = (state, id) => {
  const { name } = state.cryptoCurrencies[id];
  const category = name[0];
  const newCategoryList = state.dropdown[category].filter((currency) => {
    return currency.id !== id;
  });
  const dropdown = {
    ...state.dropdown,
    [category]: newCategoryList,
  };

  return {
    ...state,
    dropdown,
  };
};

const addCryptoToDropdown = (state, id) => {
  const { name } = state.cryptoCurrencies[id];
  const category = name[0];
  const dropdown = {
    ...state.dropdown,
    [category]: [...state.dropdown[category], { name, id }],
  };
  return {
    ...state,
    dropdown,
  };
};
const updateCryptoPrices = (state, priceData) => {
  const { cryptoCurrencies, tableListIds } = state;
  const newTableListIds = Object.keys(priceData);
  const cryptoCurrenciesWithPrice = newTableListIds.reduce((withPrice, id) => {
    withPrice[id] = {
      ...cryptoCurrencies[id],
      price: priceData[id].quote.USD.price,
    };
    return withPrice;
  }, {});
  const result = {
    ...state,
    cryptoCurrencies: { ...cryptoCurrencies, ...cryptoCurrenciesWithPrice },
    tableListIds: [...tableListIds, ...newTableListIds],
  };
  return result;
};

const removeCurrencyFromTable = (state, id) => {
  return {
    ...state,
    tableListIds: state.tableListIds.filter((currencyId) => currencyId !== id),
  };
};

export default cryptoCurrenciesReducer;
