export const getTableListDetails = ({tableListIds, cryptocurrencies}) => {
    const tableList = Object.keys(tableListIds).reduce((list, currencyId)=> {
       list.push(cryptocurrencies[currencyId]);
       return list;
    },[]);
    return {tableList};
};

export const getDropdownListDetails = ({dropdownListIds, cryptocurrencies}) => {
    const dropdownList  = Object.keys(dropdownListIds).reduce((list, currencyId)=> {
        const {name, id} = cryptocurrencies[currencyId];
        list.push({name, id});
        return list;
    },[]);
    return {dropdownList};
};