// 구현 코드

import { useEffect, useRef } from 'react'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import naverLogo from '../../../assets/images/icon/naver.png'
import { SnsLogo } from '../../../components/elements/AuthContentTemplete'
const NaverLogin = (props) => {
    const { onLoginBySns } = props;
    const navigate = useNavigate();
    const naverRef = useRef();
    const { naver } = window;

    const NAVER_CLIENT_ID = 'SWTGhEi_FBpd22xfxU12'
    const NAVER_CALLBACK_URL = 'http://localhost:3000/login'

    const initializeNaverLogin = (click) => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            isPopup: false,
            loginButton: { color: 'green', type: 1, height: 42 },
            callbackHandle: true,
        })
        naverLogin.init()
        if (click) {
            naverLogin.getLoginStatus(async function (status) {
                if (status) {
                    // 아래처럼 선택하여 추출이 가능하고, 
                    console.log(naverLogin.user)
                    let obj = {
                        id: naverLogin.user.id,
                        profile_nickname: naverLogin.user.name,
                        login_type: 2,
                        profile_image_url: naverLogin.user.profile_image,
                    }
                    console.log(naverLogin.user.id)
                    onLoginBySns(obj);
                }
            })
        }

    }



    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }
    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0]
    }


    // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
    useEffect(() => {
        initializeNaverLogin()
        userAccessToken()
    }, [])

    

    return (
        <>
            <SnsLogo src={naverLogo} onClick={() => initializeNaverLogin(true)} />
            <div id="naverIdLogin" style={{ display: 'none' }} ref={naverRef} />
        </>
    )
}
export default NaverLogin;