import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';

function List() {
    const [product,productState] = useState([]);

    useEffect(()=> {
        axios.post("/api/product/get")
        .then(response => {
            if (response.data.success) {
                console.log(response.data);
                productState(response.data.productInfo)
            } else {

            }
        })
    },[])

    const productList = product.map((product, index) => {
        return (
            <div className='proListContainer'>
                <img src={`http://localhost:5000/${product.image}`} alt="" className='proListImage'/>
                <div>{product.title}</div>
                <div>{product.price}</div>
            </div>
        )
        
    })
    return (
        <div>
            <div className='bestSeller'>Best seller</div>
            <div className='proList'>
                {productList}
            </div>
        </div>
    )
}

export default withRouter(List);