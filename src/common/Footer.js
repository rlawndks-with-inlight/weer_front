import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/images/test/logo.svg';
const Wrappers = styled.footer`
    display:flex;
    flex-direction:column;
    background:${props => props.theme.color.background3};
    color:${props => props.theme.color.font1};
    font-weight:500;
    padding:32px 120px;
    @media screen and (max-width:1050px) {
        display:none;
    }
`
const Post = styled.div`
cursor:pointer;
border-right:1px solid ${props => props.theme.color.font1};
padding:4px;
transition: 0.3s;
&:hover{  
    color : ${props => props.theme.color.background1};
  }
`
const Footer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <>
            {pathname.includes('/manager') ?
                <>
                </>
                :
                <>
                    <Wrappers>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logo} style={{ width: '80px' }} alt="footer" />
                            <Post onClick={()=>navigate('/policy/0')}>이용약관</Post>
                            <Post onClick={()=>navigate('/policy/1')}>개인정보처리방침</Post>
                            <Post style={{ borderRight: 'none' }} onClick={()=>navigate('/policy/2')}>저작권정책</Post>
                        </div>
                        <div style={{ marginTop: '8px' }}>서울시 마포구 양화로 127 7층(첨단빌딩)</div>
                        <div style={{ marginTop: '8px' }}>Email&nbsp;&nbsp;First_partner@naver.com&nbsp;&nbsp;&nbsp;FAX&nbsp;&nbsp;02-332-3593</div>
                    </Wrappers>
                </>
            }

        </>
    )
}
export default Footer;