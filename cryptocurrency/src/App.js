import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import DropDownList from "./DropdownList.jsx";
import CurrencyDetailsTable from "./CurrencyDetailsTable";
import {mockCryptocurrencyList, mockCryptocurrencyWithPrice} from "./mockdata";
import {connect} from "react-redux";
import {CRYPTO_CURRENCY_LIST_FETCH_REQUESTED} from "./actions/actionCreators";

function App(props) {
  console.log(props)
  useEffect(() => {
    props.dispatch({type: CRYPTO_CURRENCY_LIST_FETCH_REQUESTED})
    console.log("initial load")

  })
  return (
      <div className="App">
        <DropDownList list={mockCryptocurrencyList}/>
        <CurrencyDetailsTable/>
      </div>
  );
}

export default connect()(App);
