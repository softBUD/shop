import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

function Detail (props) {
    const [Product,setProduct] = useState([]);
    const productId = props.match.params.productId

    useEffect(()=> {
    axios.post(`/api/product/products_by_id?id=${productId}&type=single`)
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
            <div className='detailDesc'>
            <div className='detailTitle'>{Product.title}</div>
            <div className='detailCategory'>분류<span className='detailCategoryVal'>{Product.category}</span></div>
            <div className='detailPrice'>가격<span className='detailPriceVal'>{Product.price}</span></div>
            </div>
            <select className="detailSelect">
                <option value="none" className='detailSelectOp'>옵션선택</option>
                <option value={Product.option} className='detailSelectOp'>{Product.option}</option>
            </select>
            <div className='detailBtn'>
            <button className='detailCart'>장바구니</button>
            <button className='detailPay'>결제하기</button>
            </div>
            
        </section>
    )
}

  export default withRouter(Detail);