import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {hideError} from "../actions/actionCreators";
const ErrorNotification = (props) => {
 const isOpen = useSelector(state => state.errorReducer.isOpen);
 const error = useSelector(state => state.errorReducer.error);
 const dispatch = useDispatch();

 function handleClose(){
 dispatch(hideError());
 }
 
 return (
 <>
 {isOpen && error && (
 <div className="fancy-error-class">
 <button onClick={handleClose}>Close Error</button>
 <span>{error}</span>
 </div>
 )}
 </>
 )
}

export default ErrorNotification;