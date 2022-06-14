import { combineReducers } from "redux";
import userReducer from "./UserReducer"

const mainReducer = combineReducers({
    'user': userReducer,
})

export default mainReducer