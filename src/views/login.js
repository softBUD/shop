import React, { useEffect, useState } from 'react';
import lipstick from '../images/lipstick.png';
import axios from 'axios';
import {useDispatch} from 'react-redux';

function Login () {

    const dispatch = useDispatch();
    const [Email,EmailState] = useState("");
    const [Password,PasswordState] = useState("");

    const onEmailHandler = (event) => {
      EmailState(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
      PasswordState(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
      event.preventDefault(); // 이벤트 발생시 새로고침 방지
      
      let body = {
        email:Email,
        password:Password
      }

      dispatch(loginUser(body))

      
  }
    return (
      <div>
        <form action="" className='loginForm' onSubmit={onSubmitHandler}>
          <div className='logoContainer'><img src={lipstick} className="logoImage" alt="" /><div className='logoTitle'>Cosme</div></div>
          <label className='noneLabel'>Email</label>
          <input type="email" onChange={onEmailHandler} placeholder="email" className='emailInput'/>
          <label className='noneLabel'>password</label>
          <input type="password"onChange={onPasswordHandler}placeholder="password" className='passInput'/>
          <button className='loginButton'>login</button>
        </form>
      </div>

    )
  }
  export default Login;