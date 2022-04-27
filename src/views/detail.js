import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

function Detail (props) {
    const productId = props.match.params.productId

    useEffect(()=> {
    axios.post(`/api/product/products_by_id?id=${productId}&type=single`)
    .then(response => {
        if(response.data.success) {
            console.log(response.data)
        }
    })},[])
    
    return (
        <div>디테일페이지</div>
    )
}

  export default withRouter(Detail);