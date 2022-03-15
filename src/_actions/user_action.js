import axios from 'axios';
import React from 'react';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/user/login',body)
    .then(response => { response.data })
    return {
        type:"LOGIN_USER",
        payload: request
        //previousState와 action을 조합해서 nextState를 return 한다
    }
}