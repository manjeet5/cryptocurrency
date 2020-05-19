import currenciesList from "./currenciesList.json"
export const mockCryptocurrencyList = {data: currenciesList};

export const mockCryptocurrencyWithPrice = {
        data: {
            "status": {
                "timestamp": "2020-05-17T17:46:56.326Z",
                "error_code": 0,
                "error_message": null,
                "elapsed": 7,
                "credit_count": 1
            },
            "data": {
                "1": {
                    "id": 1,
                    "name": "Bitcoin",
                    "symbol": "BTC",
                    "cmc_rank": 1,
                    "quote": {
                        "USD": {
                            "price": 9558.55163723
                        }
                    }
                },
                "2": {
                    "id": 2,
                    "name": "Litecoin",
                    "symbol": "LTC",
                    "slug": "litecoin",
                    "cmc_rank": 5,
                    "quote": {
                        "USD": {
                            "price": 64.3490898062,
                        }
                    }
                },
                "3": {
                    "id": 3,
                    "name": "Bitstar",
                    "symbol": "BITS",
                    "slug": "bitstar",
                    "cmc_rank": 3,
                    "quote": {
                        "USD": {
                            "price": 64.3490898062,
                        }
                    }
                }
            }
        }
    };