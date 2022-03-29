import React, { useEffect, useState } from 'react';
import lipstick from '../images/lipstick.png';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import {loginUser} from "../../src/_actions/user_action";
import {withRouter} from "react-router-dom";

function Login (props) {

    const dispatch = useDispatch();
    const [Email,EmailState] = useState("");
    const [Password,PasswordState] = useState("");

    // state를 변경시켜줌
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
      //원래는 axios로 구현하는 부분을 disapatch로 넘김
      dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          props.history.push('/')
        } else {
          alert(response.payload.message)
        }
      })
      
  }
    return (
      <div> 
        {/* onchange로 값 바꿔주어야함 , form에 submit핸들러추가*/}
        <form className='loginForm' onSubmit={onSubmitHandler}>
          <div className='logoContainer'><Link to='/' className='linkNone'><img src={lipstick} className="logoImage" alt="logo_image" /><div className='logoTitle'>Cosme</div></Link></div>
          <label className='noneLabel'>Email</label>
          <input type="email" onChange={onEmailHandler} placeholder="email" className='emailInput'/>
          <label className='noneLabel'>password</label>
          <input type="password"onChange={onPasswordHandler}placeholder="password" className='passInput'/>
          <button className='loginButton'>login</button>
        </form>
      </div>

    )
  }
  export default withRouter(Login);