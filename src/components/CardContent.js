import React, { useState,  useEffect } from 'react'
import styled from 'styled-components'
import {useNavigate,useLocation } from "react-router-dom"
import '../styles/style.css'
import {AiFillHeart} from 'react-icons/ai'
const Wrappers = styled.div`
background: #fff;
display:flex;
flex-direction:column;
width: 45%;
margin:1rem auto 0 auto;

@media screen and (max-width:500px) { 
    width: 100%;
}
`
const Img = styled.div`
width:100%;
height:12rem;
@media screen and (max-width:700px) { 
    height:27.5vw;
}
@media screen and (max-width:500px) { 
    height:61vw;
}
`
const Title = styled.div`
padding:1rem;
font-weight:bold;

`
const CardContent = (props) =>{
    const obj = props.item ?? {};
    return (
        <>
        <Wrappers>
            <Img style={{ backgroundImage: `url(${obj.image_src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} />
            <Title>
                {obj.title}
            </Title>
            <div style={{padding:'1rem',display:'flex',justifyContent:'space-between',fontSize:'0.7rem'}}>
            <div style={{display:'flex',alignItems:'center'}}><AiFillHeart style={{color:'#ababab',fontSize:'1.2rem',marginRight:'0.3rem'}} />{obj.favorite}</div>
            <div>{obj.date}</div>
            </div>
        </Wrappers>
        </>
    )
}
export default CardContent