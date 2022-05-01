import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getCartItems} from '../_actions/user_action'

function Cart(props) {
    const dispatch = useDispatch();
    const [Product,setProduct] = useState([]);
    const [Cart,setCart] = useState([]);

    useEffect(()=>{
        let cartItems = [];
        //리덕스 유저 state 안에 상품이 들어있는지 확인
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach(item => {
                    //상품이 들어있으면 변수에 id값 배열로 넣어줌
                    cartItems.push(item.id)
                })
                //상품 아이디들, 유저정보 안의 카트 데이터를 보내줌
                dispatch(getCartItems(cartItems, props.user.userData.cart));
            }
        }
       },[props.user.userData])
    return (
        <div>
            <div>내 카트</div>
            <div>
                <div>
                    <div>이미지</div>
                    <div>상품명</div>
                    <div>수량</div>
                    <div>옵션</div>
                    <div>주문일시</div>
                </div>
                <div>
                   { Product.map((item,index) => {
                       <div key={item.index}>
                      <div key={index}><img src={`http://localhost:5000/${item.image}`} alt="productImage" /></div> 
                      <div key={item.title}>{item.title}</div>
                      </div>
                   })}
                   <div></div>
                </div>
            </div>
        </div>
    )
}


export default withRouter(Cart);