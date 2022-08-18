import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import theme from '../../styles/theme';
import SelectSubType from '../../components/elements/SelectSubType';
import { zTheme } from '../../data/TestData';
import SubType from '../../components/elements/SubType';
import testImg from '../../assets/images/test/test5.jpg';
import masterImg from '../../assets/images/test/master.png';
const Wrappers = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:90%;
max-width:700px;
background:#fff;
margin-top:4rem;
margin-left:auto;
margin-right:auto;
margin-bottom:6rem;
@media screen and (max-width:900px) { 
    margin-top:3.5rem;
}
`

const Title = styled.div`
margin:1rem auto 1rem 0;
width:50%;
font-size:${props => props.theme.size.font2};
font-weight:bold;
@media screen and (max-width:700px) { 
    width:90%;
}

`
const Content = styled.div`
margin:1rem auto 1rem 0;
width:100%;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;
@media screen and (max-width:700px) { 
    
}
`

const Home = () => {
    const [channelNum, setChannelNum] = useState(0)
    const [typeNum, setTypeNum] = useState(1)
    const [subTypeNum, setSubTypeNum] = useState(0)

    const zMasterContent = [
        { date: '7월 11일', title: '오늘의 TOP PICK', sub_title: '차트영웅이 알려주는오늘의 TOP 주식은!?', hash_list: '["우크라 재건관련주","컨텐츠","식품가격인상"]', img: testImg },
        { date: '7월 11일', title: '오늘의 TOP PICK', sub_title: '차트영웅이 알려주는오늘의 TOP 주식은!?', hash_list: '["우크라 재건관련주","컨텐츠","식품가격인상"]', img: testImg },
        { date: '7월 11일', title: '오늘의 TOP PICK', sub_title: '차트영웅이 알려주는오늘의 TOP 주식은!?', hash_list: '["우크라 재건관련주","컨텐츠","식품가격인상"]', img: testImg },
    ]
    const zThemeContent = [
        { date: '2022/07/11', title: '우주공항 관련주', img: testImg },
        { date: '2022/07/05', title: '원전 관련주', img: testImg }
    ]
    const zMaster = [
        { img: masterImg },
        { img: masterImg },
        { img: masterImg },
        { img: masterImg },
        { img: masterImg },
        { img: masterImg },
        { img: masterImg },
        { img: masterImg },
        { img: masterImg },

    ]
    return (
        <>
            <Wrappers>
                <div style={{ display: 'flex', flexWrap: 'wrap',position:'relative',minHeight:'120px' }}>
                    {zMaster.map((item, idx) => (
                        <>
                            <img src={item.img} style={{position:'absolute',top:`${idx<4?'0':'40px'}`,width:'25%',left:`${idx<4?`${(idx+1)*20-15}%`:`${(idx-4)*20-5}%`}`}} />
                        </>
                    ))}
                </div>
                <Title>하루 1단어</Title>
                <Content>
                    <div>[주식용어] 유상증자</div>
                    <div style={{ fontSize: `${theme.size.font4}` }}>#주린이를 위한 #하루 #한단어</div>
                </Content>
                <Title>핵심 이슈{'&'}공시</Title>
                <Content>

                </Content>
                <Title>하루 1종목</Title>
                <Content>
                    <div>[주식] HMM</div>
                    <div style={{ fontSize: `${theme.size.font4}` }}>#주린이를 위한 #하루 #한종목 #종목분석</div>
                </Content>
                <Title>퍼스트 전문가</Title>
                <SelectSubType className='subtype-container' style={{ top: '5.9rem' }}>
                    {zTheme.map((item, index) => (
                        <>
                            <SubType style={{ borderBottom: `2px solid ${index == subTypeNum ? theme.color.background1 : '#fff'}` }} onClick={() => { setSubTypeNum(index) }}>
                                {item}
                            </SubType>
                        </>
                    ))}
                </SelectSubType>

                {zMasterContent.map((item, idx) => (
                    <>
                        <div style={{ display: 'flex', width: '100%', marginTop: '24px', minHeight: '150px' }}>
                        <img src={item.img} style={{ width: '37.5%' }} />

                            <div style={{ width: 'auto', padding: '16px', background: `${theme.color.background3}`, display: 'flex', flexDirection: 'column', width: '62.5%', justifyContent: 'space-between' }}>
                                <div style={{ fontSize: `${theme.size.font4}`, fontWeight: 'bold' }}>{item.date} {item.title}</div>
                                <div style={{ fontSize: `${theme.size.font5}` }}>{item.sub_title}</div>
                                <div style={{ fontSize: `${theme.size.font5}`, display: 'flex', flexWrap: 'wrap' }}>
                                    {JSON.parse(item.hash_list).map((hash, index) => (
                                        <>
                                            <div>
                                                #{hash}
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ))}

                <Title>핵심 테마</Title>
                <Content>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {zThemeContent.map((item, idx) => (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '47.5%', background: `${theme.color.background3}` }}>
                                    <img src={item.img} />
                                    <div style={{ padding: '16px', minHeight: '50px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: `${theme.size.font4}`, fontWeight: 'bold' }}>{item.title}</div>
                                        <div style={{ fontSize: `${theme.size.font5}` }}>{item.date}</div>
                                    </div>

                                </div>
                            </>
                        ))}
                    </div>

                </Content>
                <Title>핵심 비디오</Title>
                <iframe style={{ width: '100%', height: 'auto', height: '80vw', maxHeight: '450px' }} src="https://www.youtube.com/embed/0GrbDjHT84k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </Wrappers>
        </>
    )
}
export default Home;