import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    ADD_CRYPTO_TO_TABLE,
    CRYPTO_LIST_FETCH_REQUEST
} from "./actionTypes";
import {setError, setCryptoList, setCryptoPrices} from "./actionCreators";
import _ from "lodash";
import {cryptoPricesApi, cryptoCurrenciesApi} from "../mock/mockEndpoints";

const getPriceDetailUrl = (cryptoIds) => {
    return `https://www.stackadapt.com/coinmarketcap/quotes?id=${cryptoIds.toString()}`;
}
function* fetchCryptoCurrenciesPrices(action, cryptoCurrencies) {
    try {
        const {payload} = action;
        const cryptoList = payload.initialLoad ? _.map(cryptoCurrencies, "id").slice(0,5) : [payload.id]
        if(cryptoList.length) {
            const priceDetailUrl = getPriceDetailUrl(cryptoList);
            const  {status, data} = yield call(cryptoPricesApi, priceDetailUrl);
            if(status.error_message) {
                yield put(setError(status.error_message));
            } else {
                yield put(setCryptoPrices(data));
            }
        } else {
            yield put(setError("no crypto id provided"));
        }
    } catch(error) {
        yield put(setError(error.message));
    }
    
}
function* fetchCryptoCurrencies(action) {
    try {
        const {status, data} = yield call(cryptoCurrenciesApi);
        if(status.error_message) {
            yield put(setError(status.error_message));
        }
        yield put(setCryptoList(data));
        
        yield call(fetchCryptoCurrenciesPrices, action, data)
    } catch (error) {
        yield put(setError(error.message));
    }
 }

 function* mySaga() {
    yield takeLatest(CRYPTO_LIST_FETCH_REQUEST, fetchCryptoCurrencies);
    yield takeEvery(ADD_CRYPTO_TO_TABLE, fetchCryptoCurrenciesPrices)
  }

 export default mySaga;
