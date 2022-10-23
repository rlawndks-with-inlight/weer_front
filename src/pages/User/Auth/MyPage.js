import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Data";
import defaultImg from '../../../assets/images/icon/default-profile.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEdit } from 'react-icons/md';
import theme from "../../../styles/theme";
import { CgToggleOn, CgToggleOff } from 'react-icons/cg'

const MyCard = styled.div`
display:flex;
width:100%;
height:300px;
border:1px solid ${props => props.theme.color.background3};
@media screen and (max-width:700px) {
    flex-direction:column;
    height:600px;
}
`
const ProfileContainer = styled.div`
width:50%;
display:flex;
flex-direction:column;
align-items:center;
height:300px;
background:#f4f4f4;
@media screen and (max-width:700px) {
    width:100%;
}
`
const Container = styled.div`
width:50%;
font-size:14px;
@media screen and (max-width:700px) {
    width:100%;
}
`
const Content = styled.div`
width:100%;
display:flex;
`
const Category = styled.div`
width:100px;
padding:16px 0;
height:18px;
padding-left:16px;
border-right:1px solid ${props => props.theme.color.background1};
`
const Result = styled.div`
padding:16px 0;
height:18px;
padding-left:16px;
display:flex;
align-items:center;
`
const LogoutButton = styled.button`
width:160px;
height:40px;
margin:1rem auto;
border:none;
cursor:pointer;
background:${props => props.theme.color.font2};
color:#fff;
font-size:12px;
`
const MyPage = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({})
    const [isWebView, setIsWebView] = useState(false);

    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios('/api/auth')
            if (response.pk > 0) {
                await localStorage.setItem('auth', JSON.stringify(response))
                let obj = response;
                setAuth(obj);
            } else {
                localStorage.removeItem('auth');
                navigate('/login')
            }
        }
        isAdmin();
        if (window && window.flutter_inappwebview) {
            setIsWebView(true)
        }
    }, [])
    const onLogout = async () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            if (window && window.flutter_inappwebview) {
                var params = { 'login_type': JSON.parse(localStorage.getItem('auth'))?.type };
                window.flutter_inappwebview.callHandler('native_app_logout', JSON.stringify(params)).then(async function (result) {
                    //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                });
            }
            const { data: response } = await axios.post('/api/logout');
            if (response.result > 0) {
                localStorage.removeItem('auth');
                navigate('/login');
            } else {
                alert('error');
            }
        }
    }
    const onChangeDarkMode = (num) =>{
        if(num==1){
            localStorage.setItem('dark_mode','1');
            window.location.reload();
        }else{
            localStorage.removeItem('dark_mode');
            window.location.reload();
        }
    }
    return (
        <>
            <Wrappers className="wrapper" style={{ maxWidth: '800px' }}>
                <Title>마이페이지</Title>
                <MdEdit style={{ margin: '2rem 0 1rem auto', color: `${theme.color.font2}`, fontSize: '24px', cursor: 'pointer' }} onClick={() => navigate('/editmyinfo')} />

                <MyCard>
                    <ProfileContainer>
                        <img src={auth?.profile_img ? auth?.profile_img.substring(0, 4) == "http" ? auth?.profile_img : backUrl + auth?.profile_img : defaultImg} alt="#" style={{ height: '125px', width: '125px', borderRadius: '50%', background: '#fff', margin: 'auto' }} />
                    </ProfileContainer>
                    <Container>
                        <Content>
                            <Category>닉네임</Category>
                            <Result>
                                {auth?.nickname ?? "---"}
                            </Result>
                        </Content>
                        <Content>
                            <Category>아이디</Category>
                            <Result>
                                {auth?.type != 0 ? "---" : auth.id}
                            </Result>
                        </Content>
                        <Content>
                            <Category>비밀번호</Category>
                            <Result>********</Result>
                        </Content>
                        <Content>
                            <Category>전화번호</Category>
                            <Result>{auth?.phone ?? "---"}</Result>
                        </Content>
                        <Content>
                            <Category>개인정보동의</Category>
                            <Result>{'동의'}</Result>
                        </Content>
                        <Content>
                            <Category>다크모드</Category>
                            <Result style={{ fontSize: '28px' }}>
                                {localStorage.getItem('dark_mode') ?
                                    <>
                                        <CgToggleOn style={{ color: theme.color.background1,cursor:'pointer' }} onClick={()=>{onChangeDarkMode(0)}} />
                                    </>
                                    :
                                    <>
                                        <CgToggleOff style={{ color: '#ccc',cursor:'pointer' }} onClick={()=>{onChangeDarkMode(1)}} />
                                    </>}
                            </Result>
                        </Content>
                    </Container>
                </MyCard>
                <LogoutButton onClick={onLogout}>
                    로그아웃
                </LogoutButton>
                {isWebView ?
                    <>
                        <LogoutButton onClick={() => navigate('/appsetting')}>
                            앱 설정
                        </LogoutButton>
                    </>
                    :
                    <>
                    </>}

            </Wrappers>
        </>
    )
}
export default MyPage;