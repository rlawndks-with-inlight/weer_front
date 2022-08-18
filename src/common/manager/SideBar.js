import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import logo from '../../assets/images/test/logo.svg'

import { BsPerson, BsCameraVideo } from 'react-icons/bs'
import { MdOutlineAccessTime, MdNotificationImportant } from 'react-icons/md'
import { IoStatsChartSharp, IoLogoReact } from 'react-icons/io5'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { WiDayHaze } from 'react-icons/wi'
const Wrappers = styled.div`
display:flex;
flex-direction:column;
width:250px;
min-height:100vh;
box-shadow:0 2px 4px rgb(15 34 58 / 12%);
z-index:5;
position:fixed;
background:#fff;
overflow-y:auto;
@media screen and (max-width:1000px) {
    position:fixed;
    display:${(props => props.display)};
    transition:1s;
    @keyframes fadein {
        from {
            left:-500px;
        }
        to {
            left:0;
        }
      }
}
`
const LogoWrappers = styled.div`
text-align:center;
font-size:32px;
font-weight:bold;
padding-top:24px;
padding-bottom:24px;
color:${(props) => props.theme.color.background1};
`
const SelectMenuContent = styled.div`
width:192px;
padding:16px 12px 16px 16px;
background:${(props) => props.theme.color.manager.background2};
margin:0.3rem auto;
border-radius:3px;
font-size:15px;
display:flex;
align-items:center;
color:${(props) => props.theme.color.manager.background1};
cursor:pointer;
`
const MenuContent = styled.div`
width:192px;
padding:16px 12px 16px 16px;
background:#fff;
margin:0.3rem auto;
border-radius:12px;
font-size:15px;
display:flex;
align-items:center;
color:${(props) => props.theme.color.manager.font3};
cursor:pointer;
transition: 0.4s;
&:hover{  
    color:${(props) => props.theme.color.manager.font1};
}
`
const MenuText = styled.p`
margin:0 0 0 8px;
`
const HambergurContainer = styled.div`
display:none;
position:fixed;
top:0;
left:0;
z-index:5;
padding:12px;
@media screen and (max-width:1000px) {
    display:flex;
}
`
const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const zSidebar = [
        { name: '회원관리', link: '/manager/userlist', icon: <BsPerson /> },
        { name: '접속자현황', link: '/manager/accessorlist', icon: <MdOutlineAccessTime /> },
        { name: '회원통계', link: '/manager/userstatistics', icon: <IoStatsChartSharp /> },
        { name: '하루1단어 1종목', link: '/manager/oneday', icon: <WiDayHaze /> },
        { name: '전문가관리', link: '/manager/masterlist', icon: <FaChalkboardTeacher /> },
        { name: '테마관리', link: '/manager/themelist', icon: <IoLogoReact /> },
        { name: '이슈관리', link: '/manager/issuelist', icon: <MdNotificationImportant /> },
        { name: '비디오관리', link: '/manager/videolist', icon: <BsCameraVideo /> },
        { name: '문의관리', link: '/manager/inquirylist', icon: <AiOutlineQuestionCircle /> },
        { name: '환경설정', link: '/manager/setting', icon: <FiSettings /> },
    ];
    const [display, setDisplay] = useState('none');
    return (
        <>
            <HambergurContainer onClick={() => { setDisplay('flex') }}>
                <GiHamburgerMenu />
            </HambergurContainer>
            <Wrappers display={display}>
                <HambergurContainer onClick={() => { setDisplay('none') }}>
                    <GiHamburgerMenu />
                </HambergurContainer>
                <LogoWrappers>
                    <img src={logo} style={{ height: '40px', width: 'auto' }} />
                </LogoWrappers>

                {zSidebar.map((item, index) => (
                    <>
                        {item.link == location.pathname ?
                            <>
                                <SelectMenuContent onClick={() => { navigate(`${item.link}`) }}>
                                    {item.icon}
                                    <MenuText>{item.name}</MenuText>
                                </SelectMenuContent>
                            </>
                            :
                            <>
                                <MenuContent onClick={() => { navigate(`${item.link}`) }}>
                                    {item.icon}
                                    <MenuText>{item.name}</MenuText>
                                </MenuContent>
                            </>}

                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default SideBar