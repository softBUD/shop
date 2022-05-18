import axios from 'axios'
import { withRouter,Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faXmark} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';


function Navmenu(props) {
  const isLogged = useSelector(state=>state.user.isLoggedIn);
  const [menu,setMenu] = useState(false);

  const onBarHandler = (e) => {
    if(menu) {
      setMenu(false)
    } else {
      setMenu(true);
    }
  }
  const onLoghanlder = (e) => {
    if(isLogged === false) {
      alert("로그인 후 이용할 수 있습니다.")
      window.location.replace("/")
    }
  }

  const onLogoutHandler = () => {
    axios.get('/api/user/logout')
    .then(response => {
      if(response.data.success) {
        alert("로그아웃되었습니다.")
        window.location.replace("/")
      } else {
        alert("로그아웃 실패")
      }
    })
    }


    
    return(
      <div>
          {menu == true && 
        <div className="menuContainer">
          <div className='navClickWrapper'>
            {isLogged == false ? <a href="/user/signup" className="navClick">회원가입</a> : null}
            {isLogged == false ? <a href="/user/login" className="navClick">로그인</a> : null}
            {isLogged == true ? <div onClick={onLogoutHandler} className="navClick">로그아웃</div> : null}
            {isLogged == true ? <a href="/upload" className="navClick">상품등록</a> : null}
            <div className='copyright'>&copy; Copyright 2022 이혜영</div>
          </div>
        </div>
        }
        <header className={ props.scroll === 0 ? "headerNav" : "headerNav scrolled"}>
        {menu === false ? <FontAwesomeIcon icon={faBars} className={ props.scroll === 0 ? "faBar" : "faBar scrolled"} onClick={onBarHandler}></FontAwesomeIcon> 
        : <FontAwesomeIcon onClick={onBarHandler} className={props.scroll === 0 ? "faBar cancleIcon" : "faBar cancleIcon"} icon={faXmark}></FontAwesomeIcon>}
        
        {menu === false && 
        <div className="logo">
          <Link to="/" className={ props.scroll === 0  ? "logoTitle" : "logoTitle scrolled"}>Cosme</Link>
        </div>}

        { menu ===false &&
          <Link to="/api/cart" onClick={e=>onLoghanlder(e)}>
            <FontAwesomeIcon icon={faCartShopping} className={props.scroll === 0? "cartIcon" : "cartIcon scrolled"}></FontAwesomeIcon>
          </Link>
        }
        </header>
      </div>
    )
  }
 
  export default withRouter(Navmenu);