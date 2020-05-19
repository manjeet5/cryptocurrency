import { createStore, applyMiddleware, combineReducers } from "redux";
import getCryptoCurrencies, {initalCryptoCurrencyState} from "./reducer";
import error, {initialErrorState} from "./errorReducer";
import createSagaMiddleware from 'redux-saga'
import mySaga from "../actions/sagas";

const rootReducer = combineReducers({cryptoCurrencyReducer: getCryptoCurrencies, errorReducer: error})

const initialState = {cryptoCurrencyReducer: initalCryptoCurrencyState, errorReducer: initialErrorState};
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export default store;