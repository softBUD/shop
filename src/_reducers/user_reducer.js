import {LOGIN_USER, SIGNUP_USER, AUTH_USER} from "../_actions/types";
const initialState = {
    isLoggedIn:false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
        return {...state, loginSuccess: action.payload}
        break;
        case SIGNUP_USER:
            return {...state, signup: action.payload}
        break;
        case AUTH_USER:
            return {...state, isLoggedIn:action.payload.isAuth, userData: action.payload}
        break;
        default:
            return state;
    }
}