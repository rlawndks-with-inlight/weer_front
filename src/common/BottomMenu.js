import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from "react-router-dom"
import '../styles/style.css'
import theme from '../styles/theme'
import albumImg from '../assets/images/icon/albums.svg';
import albumActiveImg from '../assets/images/icon/albums-active.svg';
import bulbImg from '../assets/images/icon/bulb.svg';
import bulbActiveImg from '../assets/images/icon/bulb-active.svg';
import playImg from '../assets/images/icon/play.svg';
import playActiveImg from '../assets/images/icon/play-active.svg';
import talkImg from '../assets/images/icon/talk.svg';
import talkActiveImg from '../assets/images/icon/talk-active.svg';
import thumbImg from '../assets/images/icon/thumb.svg';
import thumbActiveImg from '../assets/images/icon/thumb-active.svg';
const Container = styled.aside`
    background: #fff;
    border-top: 0.1rem solid #e6e6e6;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    display:flex;
    width:100%;
    max-width:700px;
    margin: 0 auto;
`
const MenuContainer = styled.nav`
width: 100%;
max-width: 76.8rem;
height: 5rem;
display: -webkit-flex;
display: flex;
margin: 0 auto;

`
const OneMenuContainer = styled.div`
    color: inherit;
    text-decoration: none;
    width: 20%;
    min-width: 20%;
    height: 100%;
    display: flex;
    flex-direction:column;
    padding: 0.3rem 0 0.2rem;
    position: relative;
    text-align: center;
    cursor:pointer;
    align-items:center;
`
const OneMenuName = styled.span`
color: #ababab;
font-size:0.8rem;
font-weight:400;
@media screen and (max-width:400px) { 
    font-size:0.7rem;
  }
`

const BottomMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const zBottomMenu = [
        { name: '핵심이슈', link: '/selectissuecategory', imgRoot: bulbImg, activeImgRoot: bulbActiveImg, allowList: ['/selectissuecategory'] },
        { name: '퍼스트전문가', link: '/masterlist', imgRoot: thumbImg, activeImgRoot: thumbActiveImg, allowList: ['/masterlist'] },
        { name: '핵심테마', link: '/themelist', imgRoot: albumImg, activeImgRoot: albumActiveImg, allowList: ['/themelist'] },
        { name: '핵심비디오', link: '/videolist', imgRoot: playImg, activeImgRoot: playActiveImg, allowList: ['/videolist'] },
        { name: '상담문의', link: '/inquiry', imgRoot: talkImg, activeImgRoot: talkActiveImg, allowList: ['/inquiry'] }
    ];
    const [modal, setModal] = useState("none");

    const [beforeCount, setBeforeCount] = useState(0)
    const [colorList, setColorList] = useState([])
    const [display, setDisplay] = useState('flex')
    useEffect(() => {
        if (location.pathname.includes('/manager')) {
            setDisplay('none');
        } else {
            setDisplay('flex')
        }
        let arr = [];

        for (var i = 0; i < zBottomMenu.length; i++) {
            for (var j = 0; j < zBottomMenu[i].allowList.length; j++) {
                if (zBottomMenu[i].allowList[j] == location.pathname) {
                    break;
                }
            }
            if (j == zBottomMenu[i].allowList.length) {
                arr.push(theme.color.font1);
            } else {
                arr.push(theme.color.background1);
            }
        }
        setColorList(arr);
    }, [location])

    return (

        <Container className='menu-container' style={{ display: `${display}` }}>
            <MenuContainer>
                {zBottomMenu.map((item, index) => (
                    <>
                        <OneMenuContainer onClick={() => { navigate(item.link) }} style={{ color: `${colorList[index]}` }}>
                            <img src={colorList[index] == theme.color.font1 ? item.imgRoot : item.activeImgRoot} className='menu-icon' />
                            <OneMenuName style={{ color: `${colorList[index]}` }}>
                                {item.name}
                            </OneMenuName>
                        </OneMenuContainer>
                    </>
                ))}

            </MenuContainer>
        </Container>

    )
}

export default BottomMenu
