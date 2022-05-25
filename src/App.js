import React, { useState,Suspense} from 'react';
import {useDispatch} from 'react-redux';
import { Route, BrowserRouter,withRouter, Switch} from 'react-router-dom';
import Cart from './views/cart.js';
import Detail from './views/detail.js';
import Login from './views/login.js';
import Signup from './views/sign.js';
import Auth from './hoc/auth.js';
import Upload from './views/upload.js';
import Landing from './views/landing.js';
import Footer from './views/footer.js';
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
    <Suspense fallback={<div>페이지 로딩중...</div>}>
    <Switch>
      <Route path='/user/login' component={Auth(Login, false)} />
      <Route path="/user/signup" component={Auth(Signup,false)}></Route>
      <Route path="/upload" component={Auth(Upload,true)}/>
      <Route path="/api/cart" component={Auth(Cart,true)}/>
      <Route path="/api/product/:productId" component={Auth(Detail,null)}></Route>
      <Route path="/" component={Auth(Landing, null)}/>
    </Switch>
    <Footer></Footer>
    </Suspense>
  </BrowserRouter>
  );
}


export default withRouter(App);
