import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    ADD_CURRENCY_TO_TABLE,
    CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED,
    CRYPTO_CURRENCY_LIST_FETCH_FAILED,
    CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED,
    CRYPTO_CURRENCY_PRICE_FETCH_FAILED,
    CRYPTO_CURRENCY_LIST_FETCH_REQUESTED
} from "./actions/actionCreators";
import _ from "lodash";
import {mockCryptocurrencyList, mockCryptocurrencyWithPrice} from "./mockdata";
const getCryptoCurrencies = (cb) => {
    setTimeout(() => {
        return cb(mockCryptocurrencyList)
    });
}

function getCryptoPrices(cb) {
    setTimeout(() => {
        return cb(mockCryptocurrencyWithPrice)
    });
}

const getPriceDetailUrl = (currencyIds) => {
    return `https://www.stackadapt.com/coinmarketcap/quotes?id=${currencyIds.toString()}`;
}
function* fetchCryptoCurrenciesPrices(action, getPriceForCurrencyIds) {
    const promise2 = new Promise((resolve) => {
        getCryptoPrices(resolve)
    })
    const priceDetailUrl = getPriceDetailUrl(getPriceForCurrencyIds);
    const cryptoWithPrice = yield call(() => promise2, priceDetailUrl);
    const {status, data} = cryptoWithPrice;
    if(status.error_message) {
        yield put({type: CRYPTO_CURRENCY_PRICE_FETCH_FAILED, payload: {error:  status.error_message}});
    } else {
        yield put({type: CRYPTO_CURRENCY_PRICE_FETCH_SUCCEEDED, payload: {data}});
    }
   
}
function* fetchCryptoCurrencies(action) {
    try {
        const promise1 = new Promise((resolve) => {
            getCryptoCurrencies(resolve);
        });
        const cryptoCurrencies = yield call(() => promise1);
        yield put({type: CRYPTO_CURRENCY_LIST_FETCH_SUCCEEDED, payload: {data: cryptoCurrencies.data}});
        
        const getPriceForCurrencyIds = action.payload.initialLoad ? _.map(cryptoCurrencies, "id").slice(0,5) : [];
        yield call(fetchCryptoCurrenciesPrices, action, getPriceForCurrencyIds)
    } catch (error) {
       yield put({type: CRYPTO_CURRENCY_LIST_FETCH_FAILED, payload: {error: error.message}});
    }
 }

 function* mySaga() {
    yield takeLatest(CRYPTO_CURRENCY_LIST_FETCH_REQUESTED, fetchCryptoCurrencies);
  }

 export default mySaga;
