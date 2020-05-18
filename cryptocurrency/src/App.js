import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import DropDownList from "./DropdownList.jsx";
import CurrencyDetailsTable from "./CurrencyDetailsTable";
import {mockCryptocurrencyList, mockCryptocurrencyWithPrice} from "./mockdata";


function App(props) {
  console.log(props)
  useEffect(() => {
    console.log("initial load")

  })
  return (
      <div className="App">
        <DropDownList list={mockCryptocurrencyList}/>
        <CurrencyDetailsTable list={mockCryptocurrencyWithPrice}/>
      </div>
  );
}

export default App;
