import {ADD_CURRENCY_TO_TABLE} from "../actions/actionCreators";

function getCryptoCurrencies(state = {}, action) {
  console.log(action);
    switch (action.type) {
      case ADD_CURRENCY_TO_TABLE:
        return state;
      default:
        return state
    }
  }

export default getCryptoCurrencies;