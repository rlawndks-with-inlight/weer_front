import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
const Wrappers = styled.div`
display:flex;
flex-direction:column;
width:280px;
min-height:100vh;
box-shadow:0px 0px 2px #cccccc;
z-index:5;
position:fixed;
background:#fff;
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
width:220px;
padding:16px 12px;
background:${(props) => props.theme.color.background1};
margin:0.3rem auto;
border-radius:12px;
font-size:16px;
font-weight:bold;
color:#fff;
cursor:pointer;
`
const MenuContent = styled.div`
width:220px;
padding:16px 12px;
background:#fff;
margin:0.3rem auto;
border-radius:12px;
font-size:16px;
font-weight:bold;
color:${(props) => props.theme.color.font2};
cursor:pointer;
transition: 0.4s;
&:hover{  
    background-color: ${(props) => props.theme.color.background3};
}
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
    const zSidebar = [{ name: '회원관리', link: '/manager/userlist' }, { name: '접속자현황', link: '/manager/accessorlist' }, { name: '회원통계', link: '/manager/userstatistics' }, { name: '전문가관리', link: '/manager/masterlist' }, { name: '게시물관리', link: '/manager/itemlist' }];
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
                <LogoWrappers>Logo</LogoWrappers>
                {zSidebar.map((item, index) => (
                    <>
                        {item.link == location.pathname ?
                            <>
                                <SelectMenuContent onClick={() => { navigate(`${item.link}`) }}>
                                    {item.name}
                                </SelectMenuContent>
                            </>
                            :
                            <>
                                <MenuContent onClick={() => { navigate(`${item.link}`) }}>
                                    {item.name}
                                </MenuContent>
                            </>}

                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default SideBar