import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import DropDownList from "./DropdownList.jsx";
import CurrencyDetailsTable from "./CurrencyDetailsTable";
import {connect} from "react-redux";
import {CRYPTO_CURRENCY_LIST_FETCH_REQUESTED} from "./actions/actionCreators";

function App(props) {
  useEffect(() => {
    props.dispatch({type: CRYPTO_CURRENCY_LIST_FETCH_REQUESTED, payload: {initialLoad: true}})
  })
  return (
      <div className="App">
        <DropDownList />
        <CurrencyDetailsTable/>
      </div>
  );
}

export default connect()(App);
