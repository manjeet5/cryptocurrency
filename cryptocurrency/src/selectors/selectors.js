export const getTableListDetails = ({cryptoCurrencyReducer:{tableListIds, cryptoCurrencies}}) => {
    const tableList = tableListIds.reduce((list, currencyId)=> {
       list.push({...cryptoCurrencies[currencyId], id: currencyId});
       return list;
    },[]);
    return {tableList};
};

export const getDropdownListDetails = ({cryptoCurrencyReducer:{tableListIds, cryptoCurrencies}}) => {
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