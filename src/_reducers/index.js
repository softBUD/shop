import { combineReducers } from "redux";
import user from './user_reducer';
const rootReducer = combineReducers({
    
})

export default rootReducer;
// reducer들이 여러가지 존재. reducer = 어떻게 state가 변하는지 보여주고 변한 마지막 값을 반환해줌.
//여러가지 state이 존재하므로 combine reducer에서 하나로 합쳐준다.