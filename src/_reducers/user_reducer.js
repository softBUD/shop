import {LOGIN_USER, SIGNUP_USER, AUTH_USER, ADD_TO_CART, GET_CART_ITEMS} from "../_actions/types";
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
        case ADD_TO_CART:
            return {...state,userData: {
                ...state.userData,
                cart: action.payload
            }}
            case GET_CART_ITEMS:
            return {...state, cartProduct:action.payload}
        default:
            return state;
    }
}