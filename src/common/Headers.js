import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams, useLocation } from 'react-router-dom';
import '../styles/style.css'
import logo from '../assets/images/test/test_logo.png'
import { Wrappers } from '../components/elements/Wrappers';
import { AiOutlineBell, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
const Header = styled.header`
position:fixed;
height:3rem;
width:100%;
display:flex;
align-items:center;
justify-content: space-between;
z-index:10;
max-width:700px;
background:#fff;
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
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState(1)
  useEffect(() => {
    if (location.pathname.includes('list') || location.pathname == '/'|| location.pathname == '/my/office') {
      setType(1)
    } else {
      setType(2)
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
      <Wrappers style={{ marginTop: '0' }}>
        {type == 1 ?
          <>
            <Header>
              <div style={{ marginLeft: '0.5rem' }}>
                <img src={logo} style={{ height: '2.5rem', marginTop: '0.5rem' }} onClick={() => { history.push('/') }} />
              </div>
              <div style={{ display: 'flex', marginRight: '0.5rem', color: '#000', fontSize: '1.2rem', width: '5rem', justifyContent: 'space-between' }}>
                <AiOutlineBell onClick={handleModal}/>
                <AiOutlineSearch onClick={()=>{alert("준비중입니다.")}}/>
                <AiOutlineSetting onClick={()=>{alert("준비중입니다.")}} />
              </div>
            </Header>
          </>
          :
          <>
          </>
        }
        <ModalContainer modal={modal}>
                <ModalOverlay onClick={handleModal} />
                <ModalContent>
                    <div style={{margin:'1rem 0 0 1rem',fontSize:'0.9rem',fontWeight:'bold'}}>2022.07.15</div>
                    <div style={{margin:'1rem 0 0 1rem',paddingLeft:'1rem',fontSize:'0.9rem'}}>7월 15일 뉴스레터</div>
                    <div style={{margin:'1rem 0 0 1rem',fontSize:'0.9rem',fontWeight:'bold'}}>2022.07.13</div>
                    <div style={{margin:'1rem 0 0 1rem',paddingLeft:'1rem',fontSize:'0.9rem'}}>7월 13일 뉴스레터</div>
                    <button style={{position:'absolute',bottom:'2rem',left:'3rem',right:'3rem',border:'none',padding:'0.7rem 0',background:'#000',color:'#fff',fontSize:'1rem'}} onClick={()=>{alert("준비중입니다.")}}>앱 설정</button>
                </ModalContent>
           </ModalContainer>
      </Wrappers>
    </>
  )
}
export default Headers;