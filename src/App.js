import React, { useContext, useState,useEffect } from 'react';
import ReactDOM from 'react-dom'
import {useDispatch,useSelector} from 'react-redux';
import { Route, BrowserRouter,withRouter, Switch ,Link,useHistory} from 'react-router-dom';
import Cart from './views/cart.js';
import Detail from './views/detail.js';
import Login from './views/login.js';
import Signup from './views/signup.js';
import Auth from './hoc/auth.js';
import Upload from './views/upload.js';
import Landing from './views/landing.js';
import Navmenu from './views/navmenu';
import Footer from './views/footer.js';
import axios from 'axios';
import './App.css';


function App() {

  const dispatch = useDispatch();
  const [isLoggedIn,loggedInState] = useState(null);
  const [more,moreState] = useState(false);
  const [inven,invenState] = useState([50,60,70,80,90,100]);
  const [product, productState] = useState();
  const [scroll,setScroll] = useState(0);
  


  return (
  <BrowserRouter>
  <Switch>
    <Route path='/user/login' component={Auth(Login, false)} />
    <Route path="/user/signup" component={Auth(Signup,false)}></Route>
    <Route path="/upload" component={Auth(Upload,true)}/>
    <Route path="/api/cart" component={Auth(Cart,true)}/>
    <Route path="/api/product/:productId" component={Auth(Detail,null)}></Route>
    <Route path="/" component={Auth(Landing, null)}/>
  </Switch>
  <Footer></Footer>
  </BrowserRouter>
  );
}


export default withRouter(App);
