import { createStore, applyMiddleware, combineReducers } from "redux";
import cryptoCurrenciesReducer, {initalCryptoCurrencyState} from "./cryptoCurrenciesReducer";
import error, {initialErrorState} from "./errorReducer";
import createSagaMiddleware from 'redux-saga'
import mySaga from "../actions/sagas";

const rootReducer = combineReducers({cryptoCurrenciesReducer, errorReducer: error})

const initialState = {cryptoCurrenciesReducer: initalCryptoCurrencyState, errorReducer: initialErrorState};
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export default store;