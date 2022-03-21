import { faStepForward } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../_actions/user_action'

function SignUp(props) {

    const dispath = useDispatch();

    const [email,emailState] = useState("");
    const [domain,domainState] = useState("");
    const options = [ 
                    {value:"naver.com", name:"naver"},
                    {value:"gmail.com", name:"google"},
                    {value:"hanmail.net" ,name:"daum"}
                    ];
    const [fullEmail,fullEmailState] = useState("");
    const [id, idState] = useState("");
    const [pw, pwState] = useState("");
    const [pwCheck, pwCheckState] = useState("");


    const onEmailHandler = (e) => {
        emailState(e.currentTarget.value)
    }
    const onDomainHandler = (e) => {
        domainState(e.currentTarget.value)
    }
    const onFullEmailHandler = (e) => {
        fullEmailState(email+"@"+domain);
    }
    const onIdHandler = (e) => {
        idState(e.currentTarget.value)
    }
    const onPwHandler = (e) => {
        pwState(e.currentTarget.value)
    }
    const onPwCheckHandler = (e) => {
        pwCheckState(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: fullEmail,
            password: pw
        }
        dispath(loginUser(body))
        .then(response=> {
            if(response.payload.loginSuccess) {
                props.history.push('/')
            } else {
                alert("Error")
            }
        })
    }



    return (
        <div>
        <form action="/add" method="POST" id='signUpForm'>
            <label htmlFor="emailID">Email</label>
            <div className='emailContainer'>
            <input type="text" className='signUpEmail'value={email} onChange={onEmailHandler}/>
            <div className='eamilspan'>@</div>
            <select className='emailDomain' onChange={onDomainHandler}>
                {options.map((option) => (
                    <option 
                    key={option.value}
                    value={option.value}
                    >{option.value}</option>
                ))}
            </select>
            </div>
            <div onChange={onFullEmailHandler}>{fullEmail}</div>
            <label htmlFor="ID">ID</label>
            <input type="text"  value={id} onChange={onIdHandler}/>
            <label htmlFor="PW">PW</label>
            <input type="text" value={pw} onChange={onPwHandler}/>

            <label htmlFor="PWchk">PW check</label>
            <input type="text" value={pwCheck} onChange={onPwCheckHandler} />

            <input type="submit" value="submit" id='signUpBtn'/>
        </form>
        </div>
    )
}

export default SignUp;