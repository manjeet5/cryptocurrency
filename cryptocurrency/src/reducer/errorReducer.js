import {HIDE_ERROR} from "../actions/actionTypes";
export const initialErrorState = {
    error: null,
    isOpen: false
};
   
function errorReducer(state = initialErrorState, action) {
const { error } = action;
if(error){
    return {
    isOpen: true,
    error: error
    }
} else if(action.type === HIDE_ERROR){
    return {
    error: null,
    isOpen: false
    }
}
return state;
}

export default errorReducer;