import { faStepForward } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import {useDispatch} from 'react-redux';


// function SignUp(props) {

//     const dispath = useDispatch();

//     const [email,emailState] = useState("");
//     const [id, idState] = useState("");
//     const [pw, pwState] = useState("");
//     const [pwCheck, pwCheckState] = useState("");


//     const onEmailHandler = (e) => {
//         setEmail(e.currentTarget.value)
//     }
//     const onIdHandler = (e) => {
//         setId(e.currentTarget.value)
//     }
//     const onPwHandler = (e) => {
//         setPw(e.currentTarget.value)
//     }
//     const onPwCheckHandler = (e) => {
//         setPwChk(e.currentTarget.value)
//     }

//     const onSubmitHandler = (e) => {
//         e.preventDefault();

//         let body = {
//             email: Email,
//             password: Password
//         }
//         dispath(loginUser(body))
//         .then(response=> {
//             if(response.payload.loginSuccess) {
//                 props.history.push('/')
//             } else {
//                 alert("Error")
//             }
//         })
//     }



//     return (
//         <form action="sign" action="/add" method="POST" id='signUpForm'>
//             <label htmlFor="email">Email</label>
//             <input type="email" value={email} onChange={onEmailHandler}/>
            
//             <label htmlFor="ID">ID</label>
//             <input type="text"  value={id} onChange={onIdHandler}/>

//             <label htmlFor="PW">PW</label>
//             <input type="text" value={pw} onChange={onPwHandler}/>

//             <label htmlFor="PWchk">PW check</label>
//             <input type="text" value={pwCheck} onChange={onPwCheckHandler} />

//             <input type="submit" value="submit" id='signUpBtn'/>
//         </form>
//     )
// }

// export default SignUp;