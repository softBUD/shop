import React, { useContext, useState } from 'react';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../_actions/user_action';
import {withRouter} from "react-router-dom";


function SignUp(props) {

    const dispath = useDispatch();
    const reg = /^(?=.*[a-zA-z])(?=.*[0-9]).{6,15}$/
    const regTrim = /\s/g;
    const regKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const [Email,EmailState] = useState("");
    const [Domain,DomainState] = useState("");
    const options = [ 
                    {value:"naver.com", name:"naver"},
                    {value:"gmail.com", name:"google"},
                    {value:"hanmail.net" ,name:"daum"}
                    ];
    const [Name, NameState] = useState("");
    const [NameMsg,NameMsgState] = useState(false)
    const [PW, PWState] = useState("");
    const [PWCheck, PWCheckState] = useState("");
    const [PWMsg, PWMsgState] = useState(false);
    const [PWConMsg,PWConMsgState] = useState(false);
    const [PWChkMsg, PWChkMsgState] = useState(false);


    const onEmailHandler = (e) => {
        EmailState(e.currentTarget.value)
    
    }
    const onDomainHandler = (e) => {
        DomainState(e.currentTarget.value)
    }

    const onNameHandler = (e) => {
        NameState(e.currentTarget.value)
    }
    const onNameMsgHandler = (e) => {
       NameMsgState(true)
    }
    const onPwHandler = (e) => {
        PWState(e.currentTarget.value)
    }
    const onPwCheckHandler = (e) => {
        PWCheckState(e.currentTarget.value)
    }
    const onPWConMsgHandler = (e) => {
        let inputPW = (e.currentTarget.value)
        
        if(reg.test(inputPW)){
            PWConMsgState(true)
        } else {
            PWConMsgState(false)
        }
       
    }
    const onPWMsgHandler = (e) => {
        PWMsgState(true)
    }

    const onPWCheckMsgHandler = (e) => {
        PWChkMsgState(true)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(Name == "") {
            return alert("이름을 입력해주세요.")
        }
        if(regTrim.test(Name)) {
            return alert("이름에는 공백을 포함할 수 없습니다.")
        }
        if(regTrim.test(Email)) {
            return alert("이메일에는 공백을 포함할 수 없습니다.")
        }
        if(regKor.test(Email)) {
            return alert("이메일에는 한글을 포함할 수 없습니다.")
        }
        if(Domain == "") {
            return alert("이메일을 확인해주세요.")
        }
        if(!PWConMsg) {
            return alert("비밀번호가 옳지 않습니다.")
        }
        if(PW !== PWCheck) {
            return alert("비밀번호가 동일하지 않습니다.")
        }
        let body = {
            email: Email+"@"+Domain,
            userName: Name,
            password: PW
        }
        dispath(signUpUser(body))
        .then(response=> {
            if(response.payload.success) {
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
                <option value="none" hidden>선택하기</option>
                {options.map((option) => (
                    <option 
                    key={option.value}
                    value={option.value}
                    >{option.value}</option>
                ))}
            </select>
            </div>
            <label htmlFor="name" className='signUpLabel'>이름</label>
            <input type="text"  value={Name} onFocus={onNameMsgHandler} onChange={onNameHandler} className="signUpInput"/>
            {NameMsg == true && Name.length <2 ? <div>이름은 두글자 이상 입력해주세요</div> : null}
            <label htmlFor="PW" className='signUpLabel'>비밀번호</label>
            <input type="password" value={PW} onFocus={onPWMsgHandler} onChange={(e)=>{onPwHandler(e); onPWConMsgHandler(e);}} className="signUpInput"/>
            {PWMsg == true && PWConMsg == false ? <div>영문자와 숫자 조합필수</div>:null}
            {PWMsg == true && PW.length < 6 ? <div>6글자 이상</div>:null}
            <label htmlFor="PWchk" className='signUpLabel'>비밀번호 확인</label>
            <input type="password" value={PWCheck} onFocus={onPWCheckMsgHandler} onChange={onPwCheckHandler} className="signUpInput"/>
            {PWChkMsg == true && PW !== PWCheck ? <div>동일한 비밀번호를 입력해주세요</div>:null}
            <input type="submit" value="회원가입" id='signUpBtn'/>
        </form>
        </div>
    )
}

export default withRouter(SignUp);