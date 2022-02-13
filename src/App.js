import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  let [title,titleState] = useState(['상품1', '상품2', '상품3']);
  let [detail,detailState] = useState(['설명1', '설명2' , '설명3']);
  
  let [modal,modalState] = useState(false);
  let [modalList,modalListState] = useState(0);

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
    {
     modal === true ?
     <Modal title={title}></Modal>
     : null 
    }

    {
      title.map(function(a,i) {
        return (
        <div className="shop-list">
        <div onClick={ () => {modalState(true)}}>{ a } </div>
        <button onClick= {changeTitle}>상품수정</button>
        <hr/>
        </div>
        )
      })

    }

    { Forui() }
    </div>

  );
}

function Modal(props) {
  return (
       <div className='modal'>
        <h2></h2>
        <div>상세 날짜</div>
        <div>상세 설명</div>
      </div>
  )
}

function Forui() {
  var array = [];
  for (var i=0; i<3; i++) {
    array.push(<div>반복되는 ui</div>);
  }

  return array;
}

export default App;
