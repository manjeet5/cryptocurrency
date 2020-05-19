import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css'
import DropDownList from "./components/DropdownList.jsx";
import CurrencyDetailsTable from "./components/CurrencyDetailsTable";
import {connect} from "react-redux";
import ErrorNotification from "./components/ErrorNotification";
import {getCryptoList} from "./actions/actionCreators";
function App(props) {
  useEffect(() => {
    props.dispatch(getCryptoList());
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
