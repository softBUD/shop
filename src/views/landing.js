import React, {useEffect,useState,useRef} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import main from "../images/main.jpg";
import main2 from "../images/main2.jpg";
import main3 from "../images/main3.jpg";
import {withRouter} from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Search from './search';
import styled, {css} from 'styled-components'
import Navmenu from './navmenu';



function Landing() {

    const isLogged = useSelector(state=>state.user.isLoggedIn);
    const TOTAL_SLIDES = 2;
    const [scroll,setScroll] = useState(0);
    const [Skip, setSkip] = useState(0) //데이터 시작할 부분
    const [Limit, setLimit] = useState(6) // 몇개의 데이터를 가져올지
    const [Total,setTotal] =useState(0);
    const [Image,setImage] = useState([main,main2,main3]);
    const [product,productState] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");


    const handleFollow = () => {
        setScroll(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
      }
    

    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleFollow);
          }
        console.log("ScrollY is ", scroll); // ScrollY가 변화할때마다 값을 콘솔에 출력

        watch(); // addEventListener 함수를 실행
        return () => {
          window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
        }
      }, [scroll])

    const onLogoutHandler = () => {
        axios.get('/api/user/logout')
        .then(response => {
          if(response.data.success) {
            alert("로그아웃되었습니다.")
            window.location.replace("/")
          } else {
            alert("로그아웃 실패")
          }
        })
    }
    
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
            <div className='headerNavContainer'>
            <Navmenu scroll={scroll}></Navmenu>
            </div>
            <div className='productContainer'>
                <div className='bestSeller'>Best seller</div>
                <Search getProducts={getProducts} refreshFunction={updateSearchTerm}></Search>
                <div className='proList'>
                    {productList}
                </div>
                { Total > product.length &&
                    <div className='readMore'><button className='readMoreBtn' onClick={loadMoreHandler}>+ more</button></div> }
            </div>
        </div>
    )
}

export default withRouter(Landing);