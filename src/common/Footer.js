import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/images/test/logo.svg';
import kakao from '../assets/images/icon/kakao.png'
import kakaoFotterIcon from '../assets/images/test/kakao-footer.png'
const Wrappers = styled.footer`
    display:flex;
    flex-direction:column;
    background:${props => props.theme.color.background3};
    color:${props => props.theme.color.font1};
    font-weight:500;
    padding:32px 120px;
    font-size:${props => props.theme.size.font3};
    @media screen and (max-width:1050px) {
        margin-bottom:80px;
    }
    @media screen and (max-width:650px) {
        padding:32px 5vw;
        font-size:${props => props.theme.size.font4};

    }
`
const KakaoImg = styled.img`
width: 100px;
cursor: pointer;
margin-right:8px;
animation: fadein 0.5s;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@media screen and (max-width:650px) {
    margin: 0 0 0 auto;
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
  @media screen and (max-width:400px) {
    font-size:${props => props.theme.size.font5};
    padding:2px;
}
`
const Img = styled.img`
width: 80px;
@media screen and (max-width:400px) {
width:14vw;
}
`
const Flex = styled.div`
display:flex;
margin-top:8px;
@media screen and (max-width:650px) {
flex-direction:column;
}
`
const Footer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            {pathname.includes('/manager') || pathname.substring(0, 6) == '/post/' || pathname.substring(0, 7) == '/video/' ?
                <>
                </>
                :
                <>
                    <Wrappers className="footer">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Img src={logo} alt="footer" />
                            <Post onClick={() => navigate('/policy/0')}>이용약관</Post>
                            <Post onClick={() => navigate('/policy/1')}>개인정보처리방침</Post>
                            <Post style={{ borderRight: 'none' }} onClick={() => navigate('/policy/2')}>저작권정책</Post>
                        </div>
                        {/* <div style={{ marginTop: '8px' }}>서울시 마포구 양화로 127 7층(첨단빌딩)</div> */}
                        <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            
                            <Flex>

                                <div style={{ marginRight: '16px' }}>Email&nbsp;&nbsp;First_partner@naver.com</div>
                                <div>FAX&nbsp;&nbsp;02-332-3593</div>
                            </Flex>
                            {/* <div style={{display:'flex',alignItems:'center'}}>
                                <img src={kakao} />
                                <div></div>
                            </div> */}
                            <KakaoImg src={kakaoFotterIcon} style={{ display: `flex` }} onClick={() => window.open('http://pf.kakao.com/_ERhKxj/chat')} />
                        </Flex>
                    </Wrappers>
                </>
            }

        </>
    )
}
export default Footer;