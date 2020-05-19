import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import _ from "lodash";
// import axios from "axios";
import {
    ADD_CRYPTO_TO_TABLE,
    CRYPTO_LIST_FETCH_REQUEST
} from "./actionTypes";
import {setError, setCryptoList, setCryptoPrices} from "./actionCreators";
import axios from "axios";
import {cryptoPricesApi, cryptoCurrenciesApi} from "../mock/mockEndpoints";

const getPriceDetailUrl = (cryptoIds) => {
    return `https://www.stackadapt.com/coinmarketcap/quotes?id=${cryptoIds.toString()}`;
}
function* fetchCryptoCurrenciesPrices(action, cryptoCurrencies) {
    console.log("cryptoCurrencies", cryptoCurrencies);

    try {
        const {payload} = action;
        const cryptoList = payload.initialLoad ? _.map(cryptoCurrencies, "id").slice(0,5) : [payload.id]
        if(cryptoList.length) {
            // const priceDetailUrl = getPriceDetailUrl(cryptoList);
            const urlOptions = {
                method: "get", url: getPriceDetailUrl(cryptoList)
            }
            console.log("urlOptions", urlOptions);
            const  cryptoCurrenciesPrices = yield call(cryptoPricesApi, urlOptions);
            const  {status, data} = cryptoCurrenciesPrices.data;
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
        const urlOptions = {
            method: "get", url: "https://www.stackadapt.com/coinmarketcap/map"
        }
        const cryptoCurrenciesList = yield call(cryptoCurrenciesApi, urlOptions);
        const  {status, data} = cryptoCurrenciesList.data;
        if(status.error_message) {
            yield put(setError(status.error_message));
        } else {
            yield put(setCryptoList(data));

            yield call(fetchCryptoCurrenciesPrices, action, data)
        }
        
       
    } catch (error) {
        yield put(setError(error.message));
    }
 }

 function* mySaga() {
    yield takeLatest(CRYPTO_LIST_FETCH_REQUEST, fetchCryptoCurrencies);
    yield takeEvery(ADD_CRYPTO_TO_TABLE, fetchCryptoCurrenciesPrices)
  }

 export default mySaga;
