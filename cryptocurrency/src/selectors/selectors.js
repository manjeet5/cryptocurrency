export const getTableListDetails = ({tableListIds, cryptoCurrencies}) => {
    const tableList = tableListIds.reduce((list, currencyId)=> {
        console.log("currencyId", currencyId, "cryptoCurrencies[currencyId]", cryptoCurrencies[currencyId])
       list.push(cryptoCurrencies[currencyId]);
       return list;
    },[]);
    return {tableList};
};

export const getDropdownListDetails = ({tableListIds, cryptoCurrencies}) => {
    console.log(tableListIds);
    const dropdownList  = Object.keys(cryptoCurrencies).reduce((list, currencyId)=> {
        if(!tableListIds.includes(currencyId)) {
            const {name, id} = cryptoCurrencies[currencyId];
            list.push({name, id});
        }
        return list;
    },[]);
    return {dropdownList};
};