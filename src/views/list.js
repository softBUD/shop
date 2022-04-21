import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {continents} from './section/datas'
import {withRouter} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';

function List() {
    
    const [product,productState] = useState([]);
    const [Checked,CheckedState] = useState("");
    const [Filter,FilterState] = useState([...continents])

    useEffect(()=> {
        getProduct();   
    },[])
   
    const CheckedHandler = (e) => {
        CheckedState(e.currentTarget.value);
    }
    const getProduct = ()=> {
        axios.post("/api/product/get")
        .then(response => {
            if (response.data.success) {
                productState(response.data.productInfo)
            } else {
                alert("상품 리스트 조회 실패")
            }
        })
    }

    const productList = product.map((product, index) => {

        return (
            <div key={product._id} className='proListContainer'>
                <img src={`http://localhost:5000/${product.image}`} alt="prodictImage" className='proListImage'/>
                <div key={product.index}>{product.title}</div>
                <div key={product.title}>{product.price}</div>
            </div>
        )
        
    })
    return (
        <>
            <div className='bestSeller'>Best seller</div>
            <div className="radioContainer">
            {
                Filter.map((value,index) => {
                    return(
                        <div key={value._id} className="filterContainer">
                        <input type="radio" name={value.name} id={value.name} value={value.name} key={value.index} checked={Checked === value.name} onChange={(e)=>{CheckedHandler(e);} }/>
                        <label key={value.name} htmlFor={value.name} className="radioButton">{value.name}</label>
                        </div>
                    )
                })
            }
        </div>
            <div className='proList'>
                {productList}
            </div>
        </>
    )
}

export default withRouter(List);