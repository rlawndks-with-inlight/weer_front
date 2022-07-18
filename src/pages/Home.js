import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import '../styles/style.css'
import logoGif from '../assets/images/test/logo.gif'
import TalkContent from '../components/TalkContent';
import { zTalk } from '../data/TestData';
import { shuffleArray } from '../functions/utils';
const Wrappers = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:90%;
max-width:700px;
margin:0 auto;
background:#fff;
margin-top:4rem;
margin-bottom:6rem;
@media screen and (max-width:900px) { 
    margin-top:3.5rem;
}
`
const ContentWrappers = styled.div`
width:100%;
display:flex;
background:#f1f2f6;
flex-wrap:wrap;
margin-top:2rem;
margin-bottom:5rem;
@media screen and (max-width:500px) { 
    flex-direction:column;
}
`
const Content = styled.div`
margin:0 auto 1rem auto;
width: 100%;
@media screen and (max-width:700px) { 
    width:90%;
}
`
const Title = styled.div`
margin:1rem auto;
width:50%;
font-size:1.1rem;
font-weight:bold;
@media screen and (max-width:700px) { 
    width:90%;
}

`
const Img = styled.img`
width:100%;
`
const Home = () => {
    const [channelNum, setChannelNum] = useState(0)

    
    return (
        <>
            <Wrappers>
                
                <Title>지금 뜨는 뉴스</Title>
                <Content>
                    {shuffleArray(zTalk).map((item, index)=>(
                        <>
                        <TalkContent item={item}/>
                        </>
                    ))}
                </Content>

                
            </Wrappers>
        </>
    )
}
export default Home;