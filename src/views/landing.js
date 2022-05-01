import React, {useEffect,useState} from 'react'
import axios from 'axios'
import main from "../images/main.jpg";
import {withRouter} from "react-router-dom";
import { continents } from './section/datas';
import Search from './search';
import Footer from './footer';

function Landing() {
    const [Skip, setSkip] = useState(0) //데이터 시작할 부분
    const [Limit, setLimit] = useState(6) // 몇개의 데이터를 가져올지
    const[Total,setTotal] =useState(0);
    const [product,productState] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
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

    const updateSearchTerm = (newSearch) => {
        let body = {
            skip: 0,
            Limit: Limit,
            searchTerm: newSearch
        }

        setSkip(0);
        setSearchTerm(newSearch);
        getProducts(body)
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
                <a href={`/api/product/${product._id}`}><img src={`http://localhost:5000/${product.image}`} alt="productImage" className='proListImage'/></a>
                <div className="productDesc"key={product.index}>{product.title}</div>
                <div className="productDesc" key={product.title}>{product.price}</div>
            </div>
        )
        
    })
    return (
        <div className='landing'>
            <div className='homeContainer'>
                <div className='carouselWrapper' id='carousel_1'>
                <img src={main} alt="carousel_images" className='carouselImage'/>
                <div className='carouselText'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima quisquam nam debitis, nisi, enim vel iste quas est</div>
                </div>
            </div>
            <div className='productContainer'>
                <div className='bestSeller'>Best seller</div>
                <Search getProducts={getProducts} refreshFunction={updateSearchTerm}></Search>
                <div className='proList'>
                    {productList}
                </div>
                { Total > product.length &&
                    <div className='readMore'><button className='readMoreBtn' onClick={loadMoreHandler}>+ 더보기</button></div> }
            </div>
        </div>
    )
}

export default withRouter(Landing);