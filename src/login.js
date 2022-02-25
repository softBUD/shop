import React, { useEffect, useState } from 'react';
import {Form, Button} from 'react-bootstrap';

function Login () {
    return (
      <Form className='loginForm' action="/add" method="POST">
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

  export default Login;