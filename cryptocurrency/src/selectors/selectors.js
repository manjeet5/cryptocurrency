export const getTableListDetails = ({cryptoCurrenciesReducer:{tableListIds, cryptoCurrencies}}) => {
    const tableList = tableListIds.reduce((list, currencyId)=> {
       list.push({...cryptoCurrencies[currencyId], id: currencyId});
       return list;
    },[]);
    return {tableList};
};

export const getDropdownListDetails = ({cryptoCurrenciesReducer:{tableListIds, cryptoCurrencies}}) => {
    const dropdownList  = Object.keys(cryptoCurrencies).reduce((list, currencyId)=> {
        if(!tableListIds.includes(currencyId)) {
            list.push({
                name: cryptoCurrencies[currencyId].name,
                id: currencyId
            });
        }
        return list;
    },[]);
    return {dropdownList, tableListIds};
};