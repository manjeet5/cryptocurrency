import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import './App.css';
import 'antd/dist/antd.css'
import DropDownList from "./components/DropdownList.jsx";
import CurrencyDetailsTable from "./components/CurrencyDetailsTable";
import ErrorNotification from "./components/ErrorNotification";
import {getCryptoList} from "./actions/actionCreators";
function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCryptoList());
  })
  return (
      <div className="App">
        <ErrorNotification />
        <DropDownList />
        <CurrencyDetailsTable/>
      </div>
  );
}

export default App;
