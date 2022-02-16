import React, { useState } from 'react';
import lilac from './images/lilac.jpg';
import fruits from './images/fruits.jpg';
import leaf from './images/leaf.jpg';
import bottle1 from './images/bottle1.jpg';
import bottle2 from './images/bottle2.jpg';
import bottle3 from './images/bottle3.jpg';
import { Navbar,Container,Nav,NavDropdown,Carousel,Row,Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
  <div className="App">
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='logo'>Cosme</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">product</Nav.Link>
            <NavDropdown title="Log in" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
        <Col className='listContent'>
          <img src={bottle1} alt="bottle1" className='listImg'/>
          <div>nora</div>
          <div>35000</div>
        </Col>
        <Col className='listContent'>
        <img src={bottle2} alt="bottle2" className='listImg'/>
        <div>scruffy</div>
        <div>20000</div>
        </Col>
        <Col className='listContent'>
          <img src={bottle3} alt="bottle3" className='listImg'/>
          <div>hella</div>
          <div>18000</div>
        </Col>
      </Row>
    </Container>


</div>

  );
}


export default App;
