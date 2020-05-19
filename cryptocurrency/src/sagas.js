import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    ADD_CURRENCY_TO_TABLE,
    CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED,
    CRYPTO_CURRENCY_LIST_FETCH_FAILED,
    CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED,
    CRYPTO_CURRENCY_PRICE_FETCH_FAILED
} from "./actions/actionCreators";
import {mockCryptocurrencyList, mockCryptocurrencyWithPrice} from "./mockdata";
const getCryptoCurrencies = (cb) => {
    setTimeout(() => {
        return cb(mockCryptocurrencyList)
    });
}

const getCryptoPrices = (cb) => {
    setTimeout(() => {
        return cb(mockCryptocurrencyWithPrice)
    });
}
function* fetchCryptoCurrencies(action) {
    try {
        const promise1 = new Promise((resolve) => {
            getCryptoCurrencies(resolve);
        });
        const cryptoCurrencies = yield call(() => promise1);
        yield put({type: CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED, payload: {data: cryptoCurrencies.data}});
        
        const promise2 = new Promise((resolve) => {
            getCryptoPrices(resolve)
        })
        const cryptoWithPrice = yield call(() => promise2);
        yield put({type: CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED, payload: {data: cryptoWithPrice.data}});
    } catch (error) {
       yield put({type: CRYPTO_CURRENCY_LIST_FETCH_FAILED, payload: {error: error.message}});
    }
 }

 function* mySaga() {
    yield takeLatest("CRYPTO_CURRENCY_FETCH_REQUESTED", fetchCryptoCurrencies);
  }

 export default mySaga;
