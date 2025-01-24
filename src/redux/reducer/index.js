import handleCart from './handleCart'
import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducers = combineReducers({
    handleCart,
    userDetails: userReducer, // Map userReducer to userDetails key,
})
export default rootReducers