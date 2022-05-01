import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {addToCart} from '../_actions/user_action'
import { withRouter } from 'react-router-dom';

function Detail (props) {
    const isLogged = useSelector(state=>state.user.isLoggedIn);
    const dispatch = useDispatch();
    const [Option,setOption] = useState("");
    const [Product,setProduct] = useState([]);
    const productId = props.match.params.productId

    console.log(Option);
    
    const optionHanlder = (e) => {
        setOption(e.currentTarget.value)
        
    }
    const clickHandler = (e) => {
        if(isLogged) {
            dispatch(addToCart(productId,Option))
        } else {
            alert("로그인해주세요!");
        }     
    }
    useEffect(()=> {
        
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)

    .then(response => {
        if(response.data.success) {
            setProduct(response.data.productInfo[0])
            
        } else {
            alert("상품불러오기 실패")
        }
    })},[])
    
    return (
        <section className='detailContainer'>
            <img className='detailImage' src={`http://localhost:5000/${Product.image}`}/>
            <div className='detailContent'>
                <div className='detailTitle'>{Product.title}</div>
                <div className='detailDesc'>분류<span className='detailDescVal'>{Product.category}</span></div>
                <div className='detailDesc'>가격<span className='detailDescVal'>{Product.price}</span></div>
                <div className='detailDesc'>재고<span className='detailDescVal'>{Product.stock}</span></div>
            </div>
            <div className='detailPay'>
                <select className="detailSelect" onChange={optionHanlder}>
                    <option value="none" className='detailSelectOp'>옵션선택</option>
                    <option value={Product.option} className='detailSelectOp'>{Product.option}</option>
                </select>
                <div className='detailBtn'>
                    <button className='detailCartBtn' onClick={clickHandler}>장바구니</button>
                    <button className='detailPayBtn'>결제하기</button>
                </div>
            </div>
            
        </section>
    )
}

  export default withRouter(Detail);