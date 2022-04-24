import axios from 'axios'
import { withRouter,Link} from 'react-router-dom';
import main from '../images/main.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


function Navmenu(props) {

  const isLogged = useSelector(state=>state.user.isLoggedIn);
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
      <div className='headerNavContainer'>
        <header className='headerNav'>
            <div className='logo'>
              <Link to="/" className='linkNone'>
                <div className='logoTitle'>Cosme</div>
              </Link>
            </div>
            <div className='headerNavMenu'>
              {isLogged == false ? <a href="/user/login" className='linkNone navClick'>로그인</a> : null}
              {isLogged == false ? <a href="/user/signup" className='linkNone navClick'>회원가입</a> : null}
              {isLogged == true ? <div onClick={onLogoutHandler} className='linkNone navClick'>로그아웃</div> : null}
              {isLogged == true ? <a href="/upload" className='linkNone navClick'>상품등록</a> : null}
            </div>
            <FontAwesomeIcon icon={faCartShopping} className="cartIcon"></FontAwesomeIcon>
        </header>
        <div className='homeContainer'>
        <div className='carouselWrapper' id='carousel_1'>
              <img src={main} alt="carousel_images" className='carouselImage'/>
              <div className='carouselText'>Lorem ipsum dolor sit amet</div>
        </div>
      </div>
      </div>
    )
  }

  export default withRouter(Navmenu);