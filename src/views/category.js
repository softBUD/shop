import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {continents} from './section/datas'

function Category(props) {

    const [Checked, CheckedState] = useState("");
    const [product,productState] = useState([]);
    const [Filter,FilterState] = useState([...continents]);

    const CheckedHandler = (e) => {
        CheckedState(e.currentTarget.value);
        
    }

    useEffect(() => {

        const body = {
            category:Checked
        }
        axios.post("/api/product/category",body)
        .then(response => {
            if(response.data.success) {
                props.productState(response.data.productInfo)
            } else {
                alert("상품리스트 조회 실패");
            }
        })
    },[Checked])

    return (
        <>
        {
                Filter.map((value,index) => {
                    return(
                        <div key={value.name} className="filterContainer">
                        <input type="radio" value={value.name} key={value._id} checked={Checked == value.name} onChange={(e)=>{CheckedHandler(e);}}/>
                        <label key={value.index} htmlFor={value.name}>{value.name}</label>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Category;