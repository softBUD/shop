import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer () {
    return(
   
            <footer className='footerContainer'>
                <div className='footerText'>본 사이트는 포트폴리오용으로 제작되었습니다.
                <br/><a href="https://github.com/softBUD/shop" className="iconLink"><FontAwesomeIcon icon={faGithub} className="footerIcons"/></a>
                <span> 주니어 개발자 이혜영</span>
                <div id="footerTextTel">Tel 010-5663-7339</div>
                <div className='footerCopyright'>&copy; Copyright 2022 이혜영</div>
                </div>
            </footer>
)
}

export default Footer;