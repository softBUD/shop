import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { RadioBox } from 'antd';
import {withRouter} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { continents } from './section/datas';

function List() {
    const [Skip, setSkip] = useState(0) //데이터 시작할 부분
    const [Limit, setLimit] = useState(6) // 몇개의 데이터를 가져올지
    const[Total,setTotal] =useState(0);
    const [product,productState] = useState([]);

    const [Filters, setFilters] = useState({
        continents: [],
    })

    
    useEffect(()=>{
        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables)
    },[])

    const loadMoreHandler = (e) => {
        let skip = Skip + Limit;

        
        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
            
        }
        getProducts(variables)
        setSkip(skip)

    }

    const getProducts = (variables) => {
       
        axios.post("/api/product/get", variables)
        .then(response => {
            if(response.data.success) {
                if(variables.loadMore) {
                    //더보기버튼 작동시 기존 데이터 + 새 데이터 setstate
                    productState([...product,...response.data.productInfo])
                } else {
                    productState(response.data.productInfo)
                    setTotal(response.data.total); 
                }
            } else {
                alert("상품리스트 조회 실패");
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
            </div>
            <div className='proList'>
                {productList}
            </div>
            { Total > product.length &&
            <button className='readMoreBtn' onClick={loadMoreHandler}>더보기</button>
            }
            </>
    )
}

export default withRouter(List);