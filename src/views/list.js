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
    
    

    const  totalHandler = (e) => {
        CheckedState(null);
    }
    const CheckedHandler = (e) => {
        CheckedState(e.currentTarget.value);
    }

   
    useEffect (()=> {
        const body = {
        category: Checked
        }
    axios.post("/api/product/category", body)
    .then(response => {
            if(response.data.success) {
                productState(response.data.productInfo)
            } else {
                alert("상품리스트 조회 실패");
            }
        })
      
    },[Checked])

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
                <input type="radio" value="전체" checked={Checked == null} onChange={totalHandler}/>
                <label htmlFor="radio">전체</label>
            {
                Filter.map((value,index) => {
                    return(
                        <div key={value.name} className="filterContainer">
                        <input type="radio" value={value.name} key={value._id} checked={Checked == value.name} onChange={(e)=>{CheckedHandler(e);} }/>
                        <label key={value.index} htmlFor={value.name}>{value.name}</label>
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