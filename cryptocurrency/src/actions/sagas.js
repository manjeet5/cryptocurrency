import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import _ from "lodash";
// import axios from "axios";
import {
    ADD_CRYPTO_TO_TABLE,
    CRYPTO_LIST_FETCH_REQUEST,
    REMOVE_CRYPTO_FROM_TABLE
} from "./actionTypes";
import {setError, setCryptoList, setCryptoPrices, setDropdown, removeCryptoFromDropdown, removeCryptoFromTableList, addCryptoToDropdown} from "./actionCreators";
import axios from "axios";
import {cryptoPricesApi, cryptoCurrenciesApi} from "../mock/mockEndpoints";

const getPriceDetailUrl = (cryptoIds) => {
    return `https://www.stackadapt.com/coinmarketcap/quotes?id=${cryptoIds.toString()}`;
}

function* addCryptToTable(action) {
    const {payload} = action;
    yield call(fetchCryptoCurrenciesPrices, action)
    yield put(removeCryptoFromDropdown(payload));
}

function* removeCryptoFromTableSaga(action) {
    const {payload} = action;
    yield put(removeCryptoFromTableList(payload));
    yield put(addCryptoToDropdown(payload));
}
function* fetchCryptoCurrenciesPrices(action, inititalTableRenderList) {
    console.log("cryptoCurrencies", inititalTableRenderList);

    try {
        const {payload} = action;
        const cryptoList = inititalTableRenderList || [payload.id]
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
            const inititalTableRenderList = _.map(data, "id").slice(0,5);
            yield put(setDropdown({data, inititalTableRenderList}));

            yield call(fetchCryptoCurrenciesPrices, action, inititalTableRenderList)
        }
        
       
    } catch (error) {
        yield put(setError(error.message));
    }
 }

 function* mySaga() {
    yield takeLatest(CRYPTO_LIST_FETCH_REQUEST, fetchCryptoCurrencies);
    yield takeEvery(ADD_CRYPTO_TO_TABLE, addCryptToTable);
    yield takeEvery(REMOVE_CRYPTO_FROM_TABLE, removeCryptoFromTableSaga)
  }

 export default mySaga;
