import React, {useEffect} from 'react'
import axios from 'axios'
import {withRouter} from "react-router-dom";

function List() {

    useEffect(()=> {
        axios.post("/api/product/get")
        .then(response => {
            if (response.data.success) {
                console.log(response.data)
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