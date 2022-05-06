import axios from 'axios'
import { withRouter,Link} from 'react-router-dom';
import main from '../images/main.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


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
        <header className={(menu === true) || props.scroll === 0 ? "headerNav" : "headerNav scrolled"}>
        <FontAwesomeIcon icon={faBars} className={menu === true || props.scroll === 0 ? "faBar" : "faBar scrolled"} onClick={onBarHandler}></FontAwesomeIcon>
        <div className="logo">
          <Link to="/" className={(menu === true) || props.scroll === 0  ? "logoTitle" : "logoTitle scrolled"}>Cosme</Link>
        </div>
          <div className='headerNavMenu'>
            {isLogged == true ? <div onClick={onLogoutHandler} className='linkNone navClick'>로그아웃</div> : null}
            {isLogged == true ? <a href="/upload" className='navClick'>상품등록</a> : null}
          </div>
          <Link to="/api/cart" onClick={e=>onLoghanlder(e)}><FontAwesomeIcon icon={faCartShopping} className={props.scroll === 0 || (menu === true) ? "cartIcon" : "cartIcon scrolled"}></FontAwesomeIcon></Link>
        </header>
        {menu == true && <div className="menuContainer"></div>}
      </div>
    )
  }
 
  export default withRouter(Navmenu);