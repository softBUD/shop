import {LOGIN_USER, SIGNUP_USER, AUTH_USER} from "../_actions/types";
const initailState = {
    user: [],
    isLoading:false,
    idEditing:false,
    productBeingEdited: null
}

export default function(state = initailState, action) {
    switch(action.type) {
        case LOGIN_USER:
        return {...state, loginSuccess: action.payload}
        break;
        case SIGNUP_USER:
            return {...state, signup: action.payload}
        break;
        case AUTH_USER:
            return {...state, userData: action.payload}
        break;
        default:
            return state;
    }
}