import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from "react-router-dom"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/style.css'
import {IoChatbubbleEllipsesSharp} from 'react-icons/io5'
import { shuffleArray } from '../functions/utils';
const Wrappers = styled.div`
position:relative;
background: #0c2461;
display:flex;
flex-direction:column;
width: 45%;
margin:2rem auto 0 auto;

@media screen and (max-width:500px) { 
    width: 90%;
}
z-index:2;
color:#fff;
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
z-index:2;
`
const Title = styled.div`
padding:1rem;
font-weight:bold;
z-index:2;
background:#0c2461;
`
const BackDiv = styled.div`
z-index:1;
position:absolute;
background:#ccc;
bottom:-32px;
width:9rem;
height:7rem;
-webkit-transform-style: preserve-3d;
transform: rotateZ(0deg) rotateX(49deg) rotateY(13deg);
`
const TalkContent = (props) => {
    const [posts, setPosts] = useState([])
    const obj = props.item ?? {};
    const settings = {
        infinite: false,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    useEffect(()=>{
        setPosts(shuffleArray(obj.image_list))
        console.log(shuffleArray(obj.image_list))
    },[])
    return (
        <>
            <Wrappers>
                <Slider {...settings}>
                    {posts.map((item, index) => (
                        <>
                        <Img style={{ backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}/>
                        </>
                    ))}
                </Slider>
                <Title>
                    {obj.title}
                </Title>
               
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem',zIndex:'2',background:'#0c2461' }}>
                    <div style={{display:'flex',alignItems:'center'}}><IoChatbubbleEllipsesSharp style={{marginRight:'0.3rem'}} />{obj.comment}</div>
                    <div>찬성 <strong>{obj.agree}</strong> | 반대 <strong>{obj.opposite}</strong></div>
                </div>
                <div/>
                <BackDiv/>
            </Wrappers>
        </>
    )
}
export default TalkContent