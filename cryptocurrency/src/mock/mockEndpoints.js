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

export const  cryptoPricesApi = () => {
    const promise = new Promise((resolve) => {
        getCryptoPrices(resolve)
    })
    return promise;
}
export const  cryptoCurrenciesApi = () => {
    const promise = new Promise((resolve) => {
        getCryptoCurrencies(resolve);
    });
    return promise;
}