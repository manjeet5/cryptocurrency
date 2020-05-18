function getCryptoCurrencies(state = {}, action) {
    switch (action.type) {
      case 'GET_CURRENCY_INITIAL_LOAD':
        return state;
      default:
        return state
    }
  }

export default getCryptoCurrencies;