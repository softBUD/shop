import React, { useState } from "react";


function Search(props) {

    const [SearchTerm, setSearchTerm] = useState("");
    const searchHandler = (e) => {
        setSearchTerm(e.currentTarget.value);

        if(e.currentTarget.value == "") {
            const variables = {
                skip: props.Skip,
                limit: props.Limit,
            }
            props.getProducts(variables);
        }
    }
    const submitSearchHandler = (e) => {
        e.preventDefault();
        props.refreshFunction(SearchTerm);
    } 

    return(
        <form className="searchForm" onSubmit={submitSearchHandler}>
            <input className="searchInput" type="text" placeholder="nora를 검색해보세요" onChange={searchHandler}/>
            <button className="searchButton"></button>
        </form>
    )
}
export default Search;