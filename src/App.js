import React, { useState } from 'react';
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
import data from './data.js';
import './App.css';

function App() {
  let [product, productState] = useState(data);
  let [proImg, proImgState] = useState([bottle1,bottle2,bottle3,bottle4,bottle5,bottle6])
  let [home, homeState] = useState(true);
  let [login, loginState] = useState(false);
  return (
  <div className="App">
    <Route exact path="/">
    <Navmenu className="topMenu"></Navmenu>
    <Home proImg={proImg} product={product}></Home>
    </Route>
    <Route exact path="/login">
    <Navmenu></Navmenu>
    <Login></Login>
    </Route>
</div>

  );
}


function Navmenu() {
  return(
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className='logo' href="/">Cosme</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#link">product</Nav.Link>
              <NavDropdown title="menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">log in</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">submit</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">cart</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )

}

function Home (props) {
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
        {
          props.product.map(function(a,i) {
            return (
              <Col className='listContent'key={i}>
                <img className="listImg" src={props.proImg[i]} alt="productImages" />
                <div>{props.product[i].title}</div>
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

function Login () {
  return (
    <Form className='loginForm'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ID</Form.Label>
        <Form.Control className='formBox' type="email" placeholder="Enter id" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className='formBox' type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
        <Button className="loginButton" variant="primary" type="submit">
        Submit
        </Button>
      </Form.Group>
      
    </Form>
  )
}
export default App;
