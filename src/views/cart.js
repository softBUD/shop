import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getCartItems} from '../_actions/user_action'

function Cart(props) {
    const dispatch = useDispatch();
    const [Product,setProduct] = useState([]);
    useEffect(()=>{
        let cartItems = [];
        //유저 데이터 true이고, cart에 상품이 있을때
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach(item => {
                    //userData.cart : id,quantity,option
                    //상품이 들어있으면 상품들의 id값 배열로 넣어줌
                    cartItems.push(item.id)
                })
                //상품 아이디, 유저정보 안의 카트 데이터 넣어서 실행
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                .then((response)=> {
                    setProduct(response.payload);
                })
            }
        }
       },[props.user.userData])
    return (
        <div className='myCartContainer'>
            <h2 id="myCart">내 카트</h2>
            <table className='cartTable'>
                <thead>
                    <tr>
                        <td className='cartTableTd'>이미지</td>
                        <td className='cartTableTd'>상품명</td>
                        <td className='cartTableTd' id='tableTdOption'>옵션</td>
                        <td className='cartTableTd'>가격</td>
                        <td className='cartTableTd'>수량</td>
                    </tr>
                </thead>
                    <tbody>
                        
                            {   Product.length > 1 &&
                                Product.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                    <td key={item.index} className='cartProductInfo'><img src={`http://localhost:5000/${item.image}`} alt="productImage" /></td>
                                    <td key={item.title} className='cartProductInfo' id='cartProTitle'>{item.title}</td>
                                    <td key={item.option} className='cartProductInfo' id='cartProOption'>{item.option}</td>
                                    <td key={item.price} className='cartProductInfo' id='cartProPrice'>{item.price}</td>
                                    <td key={item.quantity} className='cartProductInfo' id='cartProQuantity'>{item.quantity}</td>
                                    </tr>
                                    )
                                })}
                        
                        <tr>
                            {Product == null && <div className='cartProductInfo'>상품정보가 없습니다.</div> }
                        </tr>
                    </tbody>
            </table>
        </div>
    
    )
}


export default withRouter(Cart);