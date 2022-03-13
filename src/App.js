import React, { useContext, useState,useEffect } from 'react';
import ReactDOM from 'react-dom'
import lilac from './images/lilac.jpg';
import fruits from './images/fruits.jpg';
import leaf from './images/leaf.jpg';
import bottle1 from './images/bottle1.jpg';
import bottle2 from './images/bottle2.jpg';
import bottle3 from './images/bottle3.jpg';
import bottle4 from './images/bottle4.jpg';
import bottle5 from './images/bottle5.jpg';
import bottle6 from './images/bottle6.jpg';
import { Navbar,Container,Nav,NavDropdown,Carousel,Row,Col ,Form, Button} from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import Cart from './views/cart.js';
import Landing from './views/landing.js';
import Detail from './views/detail.js';
import Login from './views/login.js';
//import SignUp from './views/signUp.js';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';


function App() {
  let [more,moreState] = useState(false);
  let [inven,invenState] = useState([50,60,70,80,90,100]);
  let [product, productState] = useState();
  let [proImg, proImgState] = useState([bottle1,bottle2,bottle3,bottle4,bottle5,bottle6]);

  return (
  <div className="App">
    <Navmenu className="topMenu"></Navmenu>
    <Switch>
      <Route exact path="/"><Home proImg={proImg} product={product}></Home></Route>
      <Route exact path="/api/user/login"/>
      <Route exact path="/detail/:id">
        <Detail product={product} proImg={proImg}></Detail>
      </Route>
      <Route exact path="/api/product/cart"><Cart></Cart></Route>
      {/* <Route exact path="/signUp"><SignUp></SignUp></Route> */}
      <Route exact path="/api/user/signup"></Route>
    </Switch>
</div>
  );
}
function Navmenu() {
  return(
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className='logo'><Link to="/" className='linkNone' id='cosme'>Cosme</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className='linkNone'>product</Nav.Link>
              <NavDropdown title="menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">log in</NavDropdown.Item>
                <NavDropdown.Item href="/signup">sign up</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <div><FontAwesomeIcon icon={faCartShopping} className="cartIcon"></FontAwesomeIcon></div>
        </Container>
      </Navbar>
    </div>
  )
}

function Home (props) {
  useEffect(()=>{
          axios.get('http://localhost:5000/api/product/get')
          .then((result)=> {
          props.productState([...result.data])
          }).catch(()=>{/*요청실패시 실행*/})
  },[])

  return (
    <div className='homeContainer'>
      <Carousel fade>
      <Carousel.Item>
        <img
          className="carFirst"
          src={lilac}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className='slideTitle' id='slideTitleFirst'>Floral</h3>
          <p id='slideTextFirst'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carSecond"
          src={fruits}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className='slideTitle' id='slideTitleSecond'>Fruits</h3>
          <p id='slideTextSecond'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carThird"
          src={leaf}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className='slideTitle' id='slideTitleThird'>Nature</h3>
          <p id='slideTextThird'>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
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


export default App;
