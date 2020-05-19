import { createStore, applyMiddleware } from "redux";
import getCryptoCurrencies from "./reducer/reducer";
import createSagaMiddleware from 'redux-saga'
import mySaga from "./sagas";
const initalState = {
    cryptoCurrencies: {},
    tableListIds: [],
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(getCryptoCurrencies, initalState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)

export default store;