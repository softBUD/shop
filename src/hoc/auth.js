import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {


    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(()=> {

            dispatch(auth()).then(response => {
                console.log(response)

                
                if(!response.payload.isAuth) {
                    //로그인 하지 않은 상태
                    if(option) {
                        props.history.push('/api/user/login')
                    }
                } else {
                    //로그인 한 상태이고 어드민 권한이 없는 상태 (inAdmin이 false)
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } if(option === false) {
                        //로그인 한 상태에서 접속할 수 없는 페이지에 접근
                        props.history.push('/')

                    }
                }
            })
        },[])
        return(
            <SpecificComponent/>
        )
    
    }


    return AuthenticationCheck
}