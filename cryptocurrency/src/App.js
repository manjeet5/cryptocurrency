import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import DropDownList from "./components/DropdownList.jsx";
import CurrencyDetailsTable from "./components/CurrencyDetailsTable";
import {connect} from "react-redux";
import {CRYPTO_CURRENCY_LIST_FETCH_REQUESTED} from "./actions/actionTypes";
import ErrorNotification from "./components/ErrorNotification";
function App(props) {
  useEffect(() => {
    props.dispatch({type: CRYPTO_CURRENCY_LIST_FETCH_REQUESTED, payload: {initialLoad: true}})
  })
  return (
      <div className="App">
        <ErrorNotification />
        <DropDownList />
        <CurrencyDetailsTable/>
      </div>
  );
}

export default connect()(App);
