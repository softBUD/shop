import React, { useState } from "react";
import searchIcon from "../images/search.png"


function Search(props) {

    const [SearchTerm, setSearchTerm] = useState("");
    const searchHandler = (e) => {
        setSearchTerm(e.currentTarget.value);
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