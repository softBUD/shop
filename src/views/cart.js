import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getCartItems} from '../_actions/user_action'

function Cart(props) {
    const dispatch = useDispatch();
    const [Product,setProduct] = useState([]);
    console.log(Product);
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
        <div>
            <h2>내 카트</h2>
            <table>
                <thead>
                    <tr>
                        <td>이미지</td>
                        <td>상품명</td>
                        <td>옵션</td>
                        <td>가격</td>
                        <td>수량</td>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            {
                                Product.length > 0 &&
                                <>
                                <td className='cartProductInfo'><img src={`http://localhost:5000/${Product[0].image}`} alt="" /></td>
                                <td className='cartProductInfo'><div>{Product[0].title}</div></td>
                                <td className='cartProductInfo'><div>{Product[0].option}</div></td>
                                <td className='cartProductInfo'><div>{Product[0].price}</div></td>
                                <td className='cartProductInfo'><div>{Product[0].quantity}</div></td>
                                </>
                            }
                        </tr>
                    </tbody>
            </table>
        </div>
    
    )
}


export default withRouter(Cart);