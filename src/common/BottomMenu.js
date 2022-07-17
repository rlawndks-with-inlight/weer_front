import React, { useState,  useEffect } from 'react'
import styled from 'styled-components'
import {useHistory,useRouteMatch,useLocation } from "react-router-dom"
import '../styles/style.css'
import {AiOutlineMail} from 'react-icons/ai'
import { IoVideocamOutline, IoChatbubbleOutline } from "react-icons/io5"
import {BsWallet2} from 'react-icons/bs'
import {MdPersonOutline} from 'react-icons/md'
import { zColor } from '../data/TestData'
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
font-weight:bold;
@media screen and (max-width:400px) { 
    font-size:0.7rem;
  }
`
// 회색 글씨 #ababab
// 진한글씨 #1a1a1a
// 진한 보라색 #8e44ad
// 연한 보라색 #9b59b6
// 제일 연한 보라 #cd84f1
const BottomMenu = () => {
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();
    const [display, setDisplay] = useState("none");
    const [modal, setModal] = useState("none");
    
    const [beforeCount, setBeforeCount] = useState(0)
    const [colorList, setColorList] = useState([])
    
    useEffect(()=>{
        let arr = ['#ababab','#ababab','#ababab','#ababab','#ababab']
        if(location.pathname.includes('letter')){
            arr[0] = zColor[0]
            setBeforeCount(0)
        }
        else if(location.pathname.includes('card')){
            arr[1] = zColor[0]
            setBeforeCount(1)
        }
        else if(location.pathname.includes('video')){
            arr[2] = zColor[0]
            setBeforeCount(2)
        }
        else if(location.pathname.includes('talk')){
            arr[3] = zColor[0]
            setBeforeCount(3)
        }
        else if(location.pathname.includes('my')){
            arr[4] = zColor[0]
            setBeforeCount(4)
        }
        setColorList(arr)
    },[location])

    return (

        <Container className='menu-container'>
            <MenuContainer>
                <OneMenuContainer onClick={()=>{history.push('/letterlist')}}> 
                    <AiOutlineMail className='menu-icon' style={{color:`${colorList[0]}`}} />
                    <OneMenuName style={{color:`${colorList[0]}`}}>
                        뉴스레터
                    </OneMenuName>
                </OneMenuContainer>
                <OneMenuContainer onClick={()=>{history.push('/cardlist')}}>
                    <BsWallet2 className='menu-icon' style={{color:`${colorList[1]}`}} />
                    <OneMenuName style={{color:`${colorList[1]}`}}>
                        카드뉴스
                    </OneMenuName>
                </OneMenuContainer>
                <OneMenuContainer onClick={()=>{history.push('/videolist')}}>
                    <IoVideocamOutline className='menu-icon' style={{color:`${colorList[2]}`}} />
                    <OneMenuName style={{color:`${colorList[2]}`}}>
                        비디오
                    </OneMenuName>
                </OneMenuContainer>
                <OneMenuContainer onClick={()=>{history.push('/talklist')}}>
                    <IoChatbubbleOutline className='menu-icon' style={{color:`${colorList[3]}`}} />
                    <OneMenuName style={{color:`${colorList[3]}`}}>
                        Talk
                    </OneMenuName>
                </OneMenuContainer>
                <OneMenuContainer onClick={()=>{history.push('/my/office')}}>
                    <MdPersonOutline className='menu-icon' style={{color:`${colorList[4]}`}} />
                    <OneMenuName style={{color:`${colorList[4]}`}}>
                        마이오피스
                    </OneMenuName>
                </OneMenuContainer>
            </MenuContainer>
        </Container>

    )
}

export default BottomMenu
