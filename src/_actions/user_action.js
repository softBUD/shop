import axios from 'axios';
import React from 'react';
import {USER_SERVER} from '../Config.js';
import {LOGIN_USER, SIGNUP_USER, AUTH_USER, ADD_TO_CART, GET_CART_ITEMS} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post(`/api/user/login`,dataToSubmit) //데이터저장
    .then(response => response.data)
    return {
        type:LOGIN_USER,
        payload: request
        //reducer에서 previousState와 action을 조합해서 nextState를 return 한다
    }
}

export function signUpUser(dataToSubmit) {
    const request = axios.post(`/api/user/signup`,dataToSubmit) //데이터저장
    .then(response => response.data)
    return {
        type:SIGNUP_USER,
        payload: request
    }
}

export function auth() { //get메소드이므로 body부분 불필요
    const request = axios.get(`/api/user/auth`)
    .then(response => response.data)
    return {
        type:AUTH_USER,
        payload: request
    }
}

export function addToCart(id,option) {
    let body = {
        productId : id,
        productOp: option
    }
    const request = axios.post(`/api/product/addToCart`,body)
    .then(response => response.data)
    return {
        type:ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems,userCart) {
    //상품 아이디와 상품정보를 여러개 가져옴
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then(response =>  {
        //cartItem(상품 아이디값들)에 해당하는 정보들을
        //product Cllection에서 가져온 후
        //수량 정보를 넣어준다.
        userCart.forEach((userCart, index) => {
            //가져온 user > userData > 카트안의 데이터들
            response.data.forEach((productData, index)=>{
                //가져온 상품정보 데이터들
                //유저 데이터 안에 있는 cart id값이 문자열로 저장되어있다.
                if(parseInt(userCart.id) === productData._id) {
                    response.data[index].quantity = userCart.quantity
                }
            })
        })
        return response.data;
    });
    return {
        type:GET_CART_ITEMS,
        payload: request
    }
}