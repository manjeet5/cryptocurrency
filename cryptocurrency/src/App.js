import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'
import DropDownList from "./DropdownList.jsx";
import CurrencyDetailsTable from "./CurrencyDetailsTable";
import {mockCryptocurrencyList, mockCryptocurrencyWithPrice} from "./mockdata";

function App() {
  return (
    <div className="App">
      <DropDownList list={mockCryptocurrencyList}/>
      <CurrencyDetailsTable list={mockCryptocurrencyWithPrice}/>
    </div>
  );
}

export default App;
