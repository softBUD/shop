import React, { useState } from 'react';
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
    let { id } = useParams(); //사용자가 입력한 url 파라미터들
    let findProduct = props.product.find(function(product) {
        return product.id == id //조건이 참인 데이터만 변수에 저장
    });
    let history = useHistory();

    return(
      <div className='container'>
        <Container>
          <Row>
            <Col key={1}><img className="listImg" src={props.proImg[id]} alt={id} /></Col>
            <Col key={2}>{findProduct.title}</Col>
            <Col key={3}>{findProduct.price}</Col>
            <Col key={4}><FontAwesomeIcon icon={faLeftLong} className="backButton" onClick={()=> {history.goBack();}}/>back</Col>
          </Row>
        </Container>
      </div>
    )
  }

  export default Detail;