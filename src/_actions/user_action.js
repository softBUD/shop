import axios from 'axios';
import React from 'react';
import {USER_SERVER} from '../Config.js';
import {LOGIN_USER, SIGNUP_USER, AUTH_USER, ADD_TO_CART} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/user/login',dataToSubmit) //데이터저장
    .then(response => response.data)
    return {
        type:LOGIN_USER,
        payload: request
        //reducer에서 previousState와 action을 조합해서 nextState를 return 한다
    }
}

export function signUpUser(dataToSubmit) {
    const request = axios.post('/api/user/signup',dataToSubmit) //데이터저장
    .then(response => response.data)
    return {
        type:SIGNUP_USER,
        payload: request
    }
}

export function auth() { //get메소드이므로 body부분 불필요
    const request = axios.get('/api/user/auth')
    .then(response => response.data)
    return {
        type:AUTH_USER,
        payload: request
    }
}

export function addToCart(id) {
    let body = {
        productId : id
    }
    const request = axios.post(`${USER_SERVER}/addToCart`,body) //데이터저장
    .then(response => response.data)
    return {
        type:ADD_TO_CART,
        payload: request
    }
}