import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {hideError} from "../actions/actionCreators";
import { Alert } from 'antd';

const ErrorNotification = (props) => {
 const {isOpen, error} = useSelector(state => state.errorReducer);
 const dispatch = useDispatch();

 function handleClose(){
 dispatch(hideError());
 }
 
 return isOpen && error && <Alert message={error} type="error" closable onClose={handleClose}/>
}
export default ErrorNotification;