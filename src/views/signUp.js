import { faStepForward } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../_actions/user_action'

function SignUp(props) {

    const dispath = useDispatch();

    const [Email,EmailState] = useState("");
    const [Domain,DomainState] = useState("");
    const options = [ 
                    {value:"naver.com", name:"naver"},
                    {value:"gmail.com", name:"google"},
                    {value:"hanmail.net" ,name:"daum"}
                    ];
    const [FullEmail,FullEmailState] = useState("");
    const [Name, NameState] = useState("");
    const [PW, PWState] = useState("");
    const [PWCheck, PWCheckState] = useState("");


    const onEmailHandler = (e) => {
        EmailState(e.currentTarget.value)
    }
    const onDomainHandler = (e) => {
        DomainState(e.currentTarget.value)
    }
    const onFullEmailHandler = (e) => {
        FullEmailState(Email+"@"+Domain);
    }
    const onNameHandler = (e) => {
        NameState(e.currentTarget.value)
    }
    const onPwHandler = (e) => {
        PWState(e.currentTarget.value)
    }
    const onPwCheckHandler = (e) => {
        PWCheckState(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(PW !== PWCheck) {
            return alert("비밀번호가 동일하지 않습니다.")
        }
        let body = {
            email: FullEmail,
            UserName: Name,
            password: PW
        }
        dispath(signUpUser(body))
        .then(response=> {
            if(response.payload.signupSuccess) {
                props.history.push('/')
            } else {
                alert("Error")
            }
        })
    }



    return (
        <div>
        <form onSubmit={onSubmitHandler} id='signUpForm'>
            <label htmlFor="emailID" className='signUpLabel'>이메일</label>
            <div className='emailContainer'>
            <input type="text" className='signUpEmail'value={Email} onChange={onEmailHandler}/>
            <div className='emailSpan'>@</div>
            <select className='emailDomain' onChange={onDomainHandler}>
                {options.map((option) => (
                    <option 
                    key={option.value}
                    value={option.value}
                    >{option.value}</option>
                ))}
            </select>
            </div>
            <div onChange={onFullEmailHandler}></div>
            <label htmlFor="name" className='signUpLabel'>이름</label>
            <input type="text"  value={Name} onChange={onNameHandler} className="signUpInput"/>
            <label htmlFor="PW" className='signUpLabel'>비밀번호</label>
            <input type="password" value={PW} onChange={onPwHandler} className="signUpInput"/>
            <label htmlFor="PWchk" className='signUpLabel'>비밀번호 확인</label>
            <input type="password" value={PWCheck} onChange={onPwCheckHandler} className="signUpInput"/>
            <input type="submit" value="회원가입" id='signUpBtn'/>
        </form>
        </div>
    )
}

export default SignUp;