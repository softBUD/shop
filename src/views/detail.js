import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import bottle1 from '../images/bottle1.jpg';
import bottle2 from '../images/bottle2.jpg';
import bottle3 from '../images/bottle3.jpg';
import bottle4 from '../images/bottle4.jpg';
import bottle5 from '../images/bottle5.jpg';
import bottle6 from '../images/bottle6.jpg';
import { useHistory,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong} from '@fortawesome/free-solid-svg-icons';
import {Container,Row,Col,Nav} from 'react-bootstrap';
import '../App.css';


function Detail (props) {
    
    let [inputData, inputDataState] = useState(''); 
    let [ad,adState] = useState(true);
    let { id } = useParams(); //사용자가 입력한 url 파라미터들
    let findProduct = props.product.find(function(product) {
        return product.id == id //조건이 참인 데이터만 변수에 저장
    });
    let [clickTab,clickTabState] = useState(0);
    let history = useHistory();

    useEffect(()=>{
      setTimeout(()=>{adState(false)},2000);
      console.log("실행");
      //return function 함수명() {코드}는 컴포넌트 사라질때 실행됨
    },[ad]); //자원낭비를 막기위해 특정 state가 변경될때만 실행

    return(
      <div className='container'>
        
        <div className='Container'>
          <div className='detailRow'>
            <img className="detailListImg" src={props.proImg[findProduct.id]} alt={findProduct.id} />
            <div className='findProBox'>
              <div key={2} className="findProTitle">{findProduct.title}</div>
              <div key={3} className="findProPrice">{findProduct.price}</div>
              <div key={4}><FontAwesomeIcon icon={faLeftLong} className="backButton" onClick={()=> {history.goBack();}}/>back</div>
              { ad === true ?
                <div key={5} className="ad">광고창</div> 
                : null 
              }
            </div>
          </div>
        </div>
        <div className='tabsContainer'>
          <Nav variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={()=>{ clickTabState(0)}}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={()=> {clickTabState(1)}}>Option 2</Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent clikTab={clickTab} />
        </div>

       

      </div>
    )
  }
  function TabContent(props) {
    if(props.clikTab === 0) {
      return <div>0번째 내용입니다</div>
    } else if(props.clikTab === 1) {
      return <div>1번째 내용입니다.</div>
    }
    
  }

  export default Detail;