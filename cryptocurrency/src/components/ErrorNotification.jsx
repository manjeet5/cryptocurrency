import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {hideError} from "../actions/actionCreators";
import { Alert } from 'antd';

const ErrorNotification = (props) => {
 const isOpen = useSelector(state => state.errorReducer.isOpen);
 const error = useSelector(state => state.errorReducer.error);
 const dispatch = useDispatch();

 function handleClose(){
 dispatch(hideError());
 }
 
 return isOpen && error && <Alert message={error} type="error" onClose={handleClose}/>
}
export default ErrorNotification;