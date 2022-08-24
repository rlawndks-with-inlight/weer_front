import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import '../styles/style.css'
import logo from '../assets/images/test/logo.svg'
import { AiOutlineBell, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import Modal from '../components/Modal';
import axios from 'axios'
import { zBottomMenu } from '../data/Data';

const Header = styled.header`
position:fixed;
height:6rem;
width:100%;
top:0;
z-index:10;
background:#fff;
border-bottom: 0.1rem solid #e6e6e6;
@media screen and (max-width:1000px) { 
  border-bottom: none;
  height:3rem;
}
`
const HeaderContainer = styled.div`
width:90%;
max-width:1000px;
margin:0 auto;
display:none;
align-items:center;
justify-content: space-between;
@media screen and (max-width:1000px) { 
  display:flex;
}
`
const HeaderMenuContainer = styled.div`
width:90%;
margin:0 auto;
display:flex;
align-items:center;
justify-content: space-between;
@media screen and (max-width:1000px) { 
  display:none;
}
`
const HeaderMenu = styled.div`
text-align:center;
font-size:${props=>props.theme.size.font3};
padding:0.3rem;
margin-right:0.5rem;
font-weight:bold;
cursor:pointer;
&:hover{  
  color:${(props) => props.theme.color.background1};
}
@media screen and (max-width:1200px) { 
  font-size:${props=>props.theme.size.font4};
}
`
const ModalContainer = styled.div`

    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    height: 100%;
    display: ${props => props.modal};
    justify-content: center;
    align-items: center;
    z-index:10;
`
const ModalOverlay = styled.div`
    background-color: black;
    width:100%;
    height: 100%;
    position: absolute;
    opacity: 0.4;
`
const ModalContent = styled.div`
box-shadow: 0px 10px 40px #00000029;
background-color:white;
animation: fadein 0.3s;
  -moz-animation: fadein 0.3s;
  -webkit-animation: fadein 0.3s;
  -o-animation: fadein 0.3s; 
 
position: absolute;
width:50%;
bottom:0;
height:80vh;
align-items: flex-start;
display:flex;
flex-direction:column;
width:500px;
@media screen and (max-width:700px) {
  width:80%;
  bottom:0;
  right:0;
  @keyframes fadein {
    from {
        right:-500px;
    }
    to {
        right:0;
    }
  }
  
  
}

`

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState(1)
  const [isModal, setIsModal] = useState(false);
  const [display, setDisplay] = useState('flex')
  useEffect(() => {

    if (location.pathname.includes('/manager')) {
      setDisplay('none');

    } else {
      setDisplay('flex')
    }
  }, [location])
  const [modal, setModal] = useState("none");

  const handleModal = async () => {
    if (modal == "none") {
      setModal("flex");
    }
    else {

      setModal("none");
    }
  };
  return (
    <>

      <Header style={{display:`${display}`}}>
        <HeaderContainer>
          <div>
            <img src={logo} style={{ height: '2.5rem', marginTop: '0.25rem' }} onClick={() => { navigate('/') }} />
          </div>
          <div style={{ display: 'flex', color: '#000', fontSize: '1.2rem', width: '7rem', justifyContent: 'space-between' }}>
            <AiOutlineBell onClick={handleModal} style={{ width: '2rem', height: '1.5rem' }} />
            <AiOutlineSearch onClick={() => { }} style={{ width: '2rem', height: '1.5rem' }} />
            <AiOutlineSetting onClick={() => { }} style={{ width: '2rem', height: '1.5rem' }} />
          </div>
        </HeaderContainer>
        <HeaderMenuContainer>
          <div style={{ display: 'flex',margin:'2rem 0',height:'2rem' }}>
            {zBottomMenu.map((item, idx) => (
              <>
                <HeaderMenu onClick={() => { navigate(item.link) }}>{item.name}</HeaderMenu>
              </>
            ))}
          </div>
          <div style={{position:'absolute',right:'48%',top:'0.5rem'}}>
            <img src={logo} style={{ height: '5rem'}} onClick={() => { navigate('/') }} />
          </div>
          <div style={{ display: 'flex', color: '#000', fontSize: '1.2rem', width: '7rem', justifyContent: 'space-between' }}>
            <AiOutlineBell onClick={handleModal} style={{ width: '2rem', height: '1.5rem' }} />
            <AiOutlineSearch onClick={() => { }} style={{ width: '2rem', height: '1.5rem' }} />
            <AiOutlineSetting onClick={() => { }} style={{ width: '2rem', height: '1.5rem' }} />
          </div>
        </HeaderMenuContainer>
      </Header>

      {/* <ModalContainer modal={modal}>
          <ModalOverlay onClick={handleModal} />
          <ModalContent>
            <div style={{ margin: '1rem 0 0 1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>2022.07.15</div>
            <div style={{ margin: '1rem 0 0 1rem', paddingLeft: '1rem', fontSize: '0.9rem' }}>7월 15일 뉴스레터</div>
            <div style={{ margin: '1rem 0 0 1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>2022.07.13</div>
            <div style={{ margin: '1rem 0 0 1rem', paddingLeft: '1rem', fontSize: '0.9rem' }}>7월 13일 뉴스레터</div>
            <button style={{ position: 'absolute', bottom: '2rem', left: '3rem', right: '3rem', border: 'none', padding: '0.7rem 0', background: '#000', color: '#fff', fontSize: '1rem' }} onClick={() => {  }}>앱 설정</button>
          </ModalContent>
        </ModalContainer>
        {isModal ?
          <>
            <Modal comment={'준비중입니다.'} modal={isModal} />
          </>
          :
          <>
          </>
        } */}
    </>
  )
}
export default Headers;