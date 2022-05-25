import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Navmenu from './navmenu';
import {addToCart} from '../_actions/user_action'
import { withRouter } from 'react-router-dom';

function Detail (props) {
    const isLogged = useSelector(state=>state.user.isLoggedIn);
    const dispatch = useDispatch();
    const [Option,setOption] = useState("");
    const [Product,setProduct] = useState([]);
    const productId = props.match.params.productId
    
    const optionHanlder = (e) => {
        setOption(e.currentTarget.value)
        
    }
    const clickHandler = (e) => {
        if(isLogged) {
            if(Option == "") {
                alert("상품 옵션을 선택해주세요!")
            } else {
                dispatch(addToCart(productId,Option))
                alert("카트에 상품이 등록되었습니다.")
            }
        } else {
            alert("로그인해주세요!");
        }     
    }
    useEffect(()=> {
        
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)

    .then(response => {
        if(response.data) {
            setProduct(response.data[0])
            
        } else {
            alert("상품불러오기 실패")
        }
    })},[])
    
    return (
        <div>
        <Navmenu></Navmenu>
        <section className='detailContainer'>
            <img className='detailImage' src={`http://54.242.77.76/${Product.image}`}/>
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
        </div>
    )
}

  export default withRouter(Detail);