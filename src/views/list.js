import React, {useEffect} from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';

function List() {

    useEffect(()=> {
        axios.post("/api/product/get")
        .then(response => {
            if (response.data.success) {
            } else {

            }
        })
    },[])

    return (
        <div>
            
        </div>
    )
}

export default withRouter(List);