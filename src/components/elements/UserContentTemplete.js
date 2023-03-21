import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import $ from 'jquery'
import { useState } from "react";
import { MdNavigateNext } from 'react-icons/md'

export const WrappersStyle = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:90%;
max-width:1000px;
margin-top:8rem;
margin-left:auto;
margin-right:auto;
margin-bottom:6rem;
min-height:58vh;
@media screen and (max-width:1050px) { 
    margin-top:4rem;
}

`

export const Wrappers = (props) =>{
    let {className, style} = props;
    const {pathname} = useLocation();
    useEffect(()=>{
        $('.wrappers').css('min-height',`${$(window).height()-372}px`);
    },[pathname])
    useEffect(()=>{

    },[])
    return (
        <>
        <WrappersStyle className={`wrappers ${className}`} style={style}>
            {props.children??""}
        </WrappersStyle>
        </>
    )
}
export const TitleContainer = styled.div`
display:flex;
align-items:center;
margin-top:24px;
margin-bottom:8px;
justify-content:space-between;
`
export const TitleStyle = styled.div`
font-size:${props => props.theme.size.font2};
font-weight:bold;
margin-right:16px;
cursor:pointer;
`
export const Title = (props) =>{
    const navigate = useNavigate();
    return (
        <>
        <TitleContainer className="title" onClick={()=>{navigate(props.link)}}>
        <TitleStyle>
            {props?.children??""}
        </TitleStyle>
        {props.not_arrow?
        <>
        </>
        :
        <>
        <MdNavigateNext style={{fontSize:`25px`}} />
        </>
        }

        {/* <hr className="bar"/> */}

        </TitleContainer>
        
        </>
    )
}
export const Content = styled.div`
margin:0 auto 1rem 0;
width:100%;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;
@media screen and (max-width:700px) { 
    
}
`
export const Img = styled.img`
width: 100%;
height:320px;
background:#fff;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
background-blend-mode: multiply;
@media screen and (max-width:1100px) {
    height: 28.8vw;
}
@media screen and (max-width:600px) {
    height: 52.2222222222vw;
}
`
export const Card = styled.div`
width: 48%; 
margin-bottom:16px;
background: ${props => props.theme.color.background3};
cursor:pointer;
@media screen and (max-width:600px) {
    width:100%;
}
`
export const WrapDiv = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
@media screen and (max-width:600px) { 
    display:none;
}
`
export const SliderDiv = styled.div`
display:none;
@media screen and (max-width:602px) { 
    display:flex;
}
`
export const ViewerContainer = styled.div`
margin:0 auto;
width:100%;
`
export const SelectType = styled.div`
display:flex;
width:100%;
z-index:5;
background:#fff;
margin:16px 0;
`
