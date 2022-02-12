import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  let [title,titleState] = useState(['상품1', '상품2', '상품3']);
  let [detail,detailState] = useState(['설명1', '설명2' , '설명3']);

  function changeTitle() {
    //state는 등호기호로 직접 조작할 수 없다.
    var newTitle = [...title];
    newTitle[0] = '새 상품1';
    titleState( newTitle );
  }
  return (
    <div className="App">
      <div className="shop-nav">
        <div>shop</div>
      </div>
      <div className="shop-list">
        <div>{ title[0] } </div>
        <button onClick= {changeTitle}>상품수정</button>
        <div>{ detail[0] }</div>
        <hr/>
        <div>{ title[1] } </div>
        <div>{ detail[1] }</div>
        <hr/>
        <div>{ title[2] } </div>
        <div>{ detail[2] }</div>
        <hr/>
      </div>
    </div>
  );
}

export default App;
