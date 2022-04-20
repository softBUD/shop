import React, { useContext, useState,useEffect } from 'react';
import ReactDOM from 'react-dom'
import {useDispatch,useSelector} from 'react-redux';
import main from './images/main.jpg';
import main2 from './images/main2.jpg';
import main3 from './images/main3.jpg';
import bottle1 from './images/bottle1.jpg';
import bottle2 from './images/bottle2.jpg';
import bottle3 from './images/bottle3.jpg';
import bottle4 from './images/bottle4.jpg';
import bottle5 from './images/bottle5.jpg';
import bottle6 from './images/bottle6.jpg';
import { Route, BrowserRouter,withRouter, Switch ,Link,useHistory} from 'react-router-dom';
import lipstick from './images/lipstick.png';
import Cart from './views/cart.js';
import Detail from './views/detail.js';
import Login from './views/login.js';
import Signup from './views/signup.js';
import Auth from './hoc/auth.js';
import Upload from './views/upload.js';
import List from './views/list.js';
import Navmenu from './views/navmenu';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';


function App() {
  const dispatch = useDispatch();
  const [isLoggedIn,loggedInState] = useState(null);
  const [more,moreState] = useState(false);
  const [inven,invenState] = useState([50,60,70,80,90,100]);
  const [product, productState] = useState();
  const [proImg, proImgState] = useState([bottle1,bottle2,bottle3,bottle4,bottle5,bottle6]);

  return (
  <BrowserRouter>
    <Switch>
    <Route path='/user/login' component={Auth(Login, false)} />
    <Route path="/user/signup" component={Auth(Signup,false)}></Route>
    <Route path="/upload" component={Auth(Upload,true)}/>
    <div className="App">
      <Navmenu></Navmenu>
      <Route path="/" component={Auth(List, null)}/>
      <Route path="/detail/:id" component={Auth(Detail,null)}></Route>
      <Route path="/api/product/cart" component={Cart}/>
    </div>
    </Switch>
  </BrowserRouter>
  );
}


export default withRouter(App);
