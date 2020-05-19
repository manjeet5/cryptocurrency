export const getTableListDetails = ({cryptoCurrenciesReducer:{tableListIds, cryptoCurrencies}}) => {
    const tableList = tableListIds.reduce((list, currencyId)=> {
       list.push({...cryptoCurrencies[currencyId], id: currencyId});
       return list;
    },[]);
    return {tableList};
};

export const getDropdownListDetails = ({cryptoCurrenciesReducer:{dropdown, tableListIds}}) => {
    return {dropdown, tableListIds};
};