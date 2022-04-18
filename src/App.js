import React, { useContext, useState,useEffect } from 'react';
import ReactDOM from 'react-dom'
import {useDispatch} from 'react-redux';
import main from './images/main.jpg';
import main2 from './images/main2.jpg';
import main3 from './images/main3.jpg';
import bottle1 from './images/bottle1.jpg';
import bottle2 from './images/bottle2.jpg';
import bottle3 from './images/bottle3.jpg';
import bottle4 from './images/bottle4.jpg';
import bottle5 from './images/bottle5.jpg';
import bottle6 from './images/bottle6.jpg';
import { Navbar,Container,Nav,NavDropdown,Carousel,Row,Col ,Form, Button} from 'react-bootstrap';
import { Route, BrowserRouter,withRouter, Switch ,Link,useHistory} from 'react-router-dom';
import lipstick from './images/lipstick.png';
import Cart from './views/cart.js';
import Detail from './views/detail.js';
import Login from './views/login.js';
import SignUp from './views/signUp.js';
import Auth from './hoc/auth.js';
import Upload from './views/upload.js';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';


function App() {
  const dispatch = useDispatch();
  let [more,moreState] = useState(false);
  let [inven,invenState] = useState([50,60,70,80,90,100]);
  let [product, productState] = useState();
  let [proImg, proImgState] = useState([bottle1,bottle2,bottle3,bottle4,bottle5,bottle6]);

  return (
  <BrowserRouter>
    <Switch>
    <Route path='/user/login' component={Auth(Login, false)} />
    <Route path="/user/signup" component={Auth(SignUp,false)}></Route>
    <Route path="/upload" component={Auth(Upload,true)}/>
    <div className="App">
      <Navmenu/>
      <Route path="/" component={Auth(Home, null)}></Route>
      <Route path="/detail/:id" component={Auth(Detail,null)}></Route>
      <Route path="/api/product/cart" component={Cart}/>
    </div>
    </Switch>
  </BrowserRouter>
  );
}
function Navmenu(props) {
  const onLogoutHandler = () => {
    axios.get('/api/user/logout')
    .then(response => {
      if(response.data.success) {
        axios.get("/")
        alert("로그아웃되었습니다.")
      } else {
        alert("로그아웃 실패")
      }
    })
  }
  return(
    <div className='headerNavContainer'>
      <header className='headerNav'>
          <div className='logo'>
            <Link to="/" className='linkNone' id='cosme'>
              <div className='logoTitle'>Cosme</div>
            </Link>
          </div>
          <div className='headerNavMenu'>
            <a href="/user/login" className='linkNone'>로그인</a>
            <br></br><a href="/user/signup" className='linkNone'>회원가입</a>
            <br></br><div onClick={onLogoutHandler} className='linkNone'>로그아웃</div>
            <a href="/upload" className='linkNone'>상품등록</a>
          </div>
          <div>
            <FontAwesomeIcon icon={faCartShopping} className="cartIcon"></FontAwesomeIcon>
          </div>
      </header>
    </div>
  )
}

function Home (props) {
  return (
    <div className='homeContainer'>
      <div className='carouselWrapper' id='carousel_1'>
            <img src={main} alt="carousel_images" className='carouselImage'/>
            <div className='carouselText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Perferendis recusandae excepturi omnis saepe molestiae? </div>
      </div>
      <Container className='listContainer'>
        <Row className='listWrap'>
          { props.product &&
            props.product.map(function(a,i) {
              return (
                <Col className='listContent' key={props.product[i]._id}>
                  <Link to={'/detail/'+i}><img className="listImg" src={props.proImg[i]} alt="productImages" /></Link>
                  <div>{props.product[i].name}</div>
                  <div>{props.product[i].price}</div>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}


export default withRouter(App);
