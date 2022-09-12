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
import { MdNavigateBefore } from 'react-icons/md';
import theme from '../styles/theme';
import { IoMdArrowBack } from 'react-icons/io';
import $ from 'jquery';
const Header = styled.header`
position:fixed;
height:6rem;
width:100%;
top:0;
z-index:10;
background:#fff;
box-shadow: 5px 10px 10px rgb(0 0 0 / 3%);
@media screen and (max-width:1050px) { 
  box-shadow:none;
  height:3rem;
}
`
const HeaderContainer = styled.div`
width:90%;
position:relative;
max-width:1000px;
margin:0 auto;
display:none;
align-items:center;
justify-content: space-between;
@media screen and (max-width:1050px) { 
  display:flex;
}
`
const HeaderMenuContainer = styled.div`
width:90%;
position:relative;
margin:0 auto;
display:flex;
align-items:center;
justify-content: space-between;
@media screen and (max-width:1050px) { 
  display:none;
}
`
const HeaderMenu = styled.div`
text-align:center;
font-size:${props => props.theme.size.font3};
padding:0.3rem;
margin-right:0.5rem;
font-weight:bold;
cursor:pointer;
&:hover{  
  color:${(props) => props.theme.color.background1};
}
@media screen and (max-width:1200px) { 
  font-size:${props => props.theme.size.font4};
}
`
const SearchInput = styled.input`
outline:none;
border:none;
border-bottom:1px solid #cccccc;
border-radius:0;
width:80%;
padding:10px 0;
margin:0 6px;
font-size:12px;
::placeholder {
  color:#dddddd;
  font-size:12px;
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
  const [display, setDisplay] = useState('flex');
  const [isPost, setIsPost] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState('none')
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    if (location.pathname.substring(0, 6) == '/post/' || location.pathname.substring(0, 7) == '/video/') {
      setIsPost(true);
    } else {
      setIsPost(false)
    }
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
  const myAuth = async () => {
    const { data: response } = await axios('/api/auth')
    if (response.pk > 0) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  }
  const changeSearchModal = () => {
    if (window.innerWidth <= 1050) {//모바일
      setIsSearch(true)
    } else {//pc
      setIsSearch(!isSearch)
    }
  }
  return (
    <>

      <Header style={{ display: `${display}` }}>

        <HeaderContainer>{/*모바일 */}
          {isSearch ?
            <>
              <IoMdArrowBack style={{ fontSize: '24px' }} onClick={() => setIsSearch(false)} />
              <SearchInput type={'text'} placeholder='두 글자 이상 입력해주세요.' className='search' />
              <AiOutlineSearch style={{ fontSize: '24px' }} onClick={() => {
                if ($('.search').val().length < 2) {
                  alert('두 글자 이상 입력해주세요.');
                } else {
                  setIsSearch(false);
                  navigate('/search', { state: $('.search').val() });
                }
              }} />
            </>
            :
            <>
              <div>
                {isPost ?
                  <>
                    <MdNavigateBefore style={{ fontSize: '30px', marginLeft: '-7px' }} onClick={() => { navigate(-1) }} />
                  </>
                  :
                  <>
                    <img src={logo} style={{ height: '2.5rem', marginTop: '0.25rem' }} onClick={() => { navigate('/') }} />
                  </>}
              </div>
              <div style={{ display: 'flex', color: '#000', fontSize: '1.2rem', width: '100px', justifyContent: 'space-between' }}>
                <AiOutlineBell onClick={() => navigate('/noticelist')} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
                <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
                <AiOutlineSetting onClick={myAuth} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
              </div>
            </>
          }

        </HeaderContainer>
        <HeaderMenuContainer>{/* pc */}
          <div style={{ display: 'flex', margin: '2rem 0', height: '2rem' }}>
            {zBottomMenu.map((item, idx) => (
              <>
                <HeaderMenu onClick={() => { navigate(item.link) }} style={{ color: `${item.allowList.includes(location.pathname) ? theme.color.background1 : ''}` }}>{item.name}</HeaderMenu>
              </>
            ))}
          </div>
          <div style={{ position: 'absolute', right: '48%', top: '0.5rem' }}>
            <img src={logo} style={{ height: '5rem' }} onClick={() => { navigate('/') }} />
          </div>
          <div style={{ display: 'flex', color: '#000', fontSize: '1.2rem', width: '7rem', justifyContent: 'space-between' }}>
            <AiOutlineBell onClick={() => navigate('/noticelist')} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            <AiOutlineSetting onClick={myAuth} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            {isSearch ?
              <>
              <div style={{ position: 'absolute',top:'72px',right:'48px',background:'#fff',padding:'16px',boxShadow:'0px 2px 8px #00000029',borderRadius:'8px',display:'flex',alignItems:'center' }}>
              <SearchInput type={'text'} placeholder='두 글자 이상 입력해주세요.' className='search-pc' style={{width:'300px'}} />
              <AiOutlineSearch style={{ fontSize: '24px',cursor:'pointer' }} onClick={() => {
                if ($('.search-pc').val().length < 2) {
                  alert('두 글자 이상 입력해주세요.');
                } else {
                  setIsSearch(false);
                  navigate('/search', { state: $('.search-pc').val() });
                }
              }} />
              </div>
              </>
              :
              <>
              </>
            }
            
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