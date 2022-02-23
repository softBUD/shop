import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import bottle1 from './images/bottle1.jpg';
import bottle2 from './images/bottle2.jpg';
import bottle3 from './images/bottle3.jpg';
import bottle4 from './images/bottle4.jpg';
import bottle5 from './images/bottle5.jpg';
import bottle6 from './images/bottle6.jpg';
import { useHistory,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong} from '@fortawesome/free-solid-svg-icons';
import {Container,Row,Col} from 'react-bootstrap';


function Detail (props) {
    let [inputData, inputDataState] = useState(''); 
    let [ad,adState] = useState(true);
    let { id } = useParams(); //사용자가 입력한 url 파라미터들
    let findProduct = props.product.find(function(product) {
        return product.id == id //조건이 참인 데이터만 변수에 저장
    });
    let history = useHistory();

    useEffect(()=>{
      setTimeout(()=>{adState(false)},2000);
      console.log("실행");
      //return function 함수명() {코드}는 컴포넌트 사라질때 실행됨
    },[ad]); //자원낭비를 막기위해 특정 state가 변경될때만 실행

    return(
      <div className='container'>
        
        <Container>
          <Row>
            <Col key={1}><img className="listImg" src={props.proImg[id]} alt={id} /></Col>
            <Col key={2}>{findProduct.title}</Col>
            <Col key={3}>{findProduct.price}</Col>
            <Col key={4}><FontAwesomeIcon icon={faLeftLong} className="backButton" onClick={()=> {history.goBack();}}/>back</Col>
            { ad === true ?
              <Col key={5} className="ad">광고창</Col> 
              : null 
            }
          </Row>
        </Container>
        {inputData}
        <input type="text" onChange={(e)=>{let i = inputDataState(e.target.value)}}/>
      </div>
    )
  }

  export default Detail;