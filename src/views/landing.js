import React, { useEffect } from 'react';
import axios from 'axios';

function Landing() {
    useEffect(()=> {
        axios.get('/api/landing')
        .then(response=>{console.log(response)})
    },[])
    return (
        <div>landing</div>
    )
}

export default Landing;