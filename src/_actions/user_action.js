import axios from 'axios';
import React from 'react';
import {LOGIN_USER, SIGNUP_USER, AUTH_USER} from './types';

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