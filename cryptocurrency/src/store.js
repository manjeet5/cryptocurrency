import { createStore, applyMiddleware } from "redux";
import getCryptoCurrencies from "./reducer/reducer";

const initalState = {
    cryptocurrencies: {},
    tableListIds: [],
    dropdownListIds: []
}
function logger({ getState }) {
    return next => action => {
      console.log('will dispatch', action)
  
      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action)
  
      console.log('state after dispatch', getState())
  
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }
  }
const store = createStore(getCryptoCurrencies, initalState, applyMiddleware(logger));

export default store;