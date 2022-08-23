import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from '../../styles/theme';
import SelectSubType from '../../components/elements/SelectSubType';
import { zTalk, zTheme } from '../../data/TestData';
import SubType from '../../components/elements/SubType';
import testImg from '../../assets/images/test/test5.jpg';
import masterImg from '../../assets/images/test/master.png';
import axios from 'axios';
import { backUrl } from '../../data/Data';
import { getIframeLinkByLink } from '../../functions/utils';
import LeftImgCard from '../../components/LeftImgCard';
import { Wrappers, Title, Content } from '../../components/elements/UserContentTemplete';
const Img = styled.div`
width:100%;
height:67.5vw;
max-height:500px;
z-index:2;
`
const ProFileImg1 = styled.img`

`
const ProFileImg2 = styled.img`

`
const Home = () => {
    const navigate = useNavigate();
    const [channelNum, setChannelNum] = useState(0)
    const [typeNum, setTypeNum] = useState(1)
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([]);
    const [masters, setMasters] = useState([])
    const [oneWord, setOneWord] = useState({});
    const [issues, setIssues] = useState([]);
    const [oneEvent, setOneEvent] = useState({});
    const [themes, setThemes] = useState([]);
    const [videos, setVideos] = useState([]);
    const zMasterContent = [
        { date: '7월 11일', title: '오늘의 TOP PICK', sub_title: '차트영웅이 알려주는오늘의 TOP 주식은!?', hash_list: '["우크라 재건관련주","컨텐츠","식품가격인상"]', img: testImg },
        { date: '7월 11일', title: '오늘의 TOP PICK', sub_title: '차트영웅이 알려주는오늘의 TOP 주식은!?', hash_list: '["우크라 재건관련주","컨텐츠","식품가격인상"]', img: testImg },
        { date: '7월 11일', title: '오늘의 TOP PICK', sub_title: '차트영웅이 알려주는오늘의 TOP 주식은!?', hash_list: '["우크라 재건관련주","컨텐츠","식품가격인상"]', img: testImg },
    ]
 

    const settings = {
        infinite: false,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        setPosts(zTalk[0].image_list);
        async function fetchPost() {
            const { data: response } = await axios.get('/api/gethomecontent')
            setMasters(response.data.masters)
            setOneWord(response.data.oneWord);
            setIssues(response.data.issues);
            setOneEvent(response.data.oneEvent);
            setThemes(response.data.themes);

            let videoObj = response.data.videos[0];
            videoObj.link = getIframeLinkByLink(videoObj.link);
            setVideos(videoObj);
        }
        fetchPost();
    }, [])

    return (
        <>
            <Wrappers>
                <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative', minHeight: '120px', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
                    {masters.map((item, idx) => (
                        <>
                            {idx < 4 ?
                                <>
                                    <ProFileImg1 src={backUrl+item.profile_img} style={{ position: 'absolute', bottom: `25px`, width: '100px', left: `${(idx + 1) * 21 - 20}%` }} />
                                </>
                                :
                                <>
                                    <ProFileImg2 src={backUrl+item.profile_img} style={{ position: 'absolute', bottom: `0`, width: '100px', left: `${(idx - 4) * 21 - 10}%` }} />
                                </>
                            }
                        </>
                    ))}
                </div>
                <Title>하루 1단어</Title>
                <Content onClick={() => {navigate(`/post/oneword/${oneWord?.pk}`) }}>
                    <div >{oneWord?.title ?? ""}</div>
                    <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{oneWord?.hash ?? ""}</div>
                </Content>
                <Title onClick={()=>navigate('/selectissuecategory')}>핵심 이슈{'&'}공시</Title>
                <Content>

                    <div style={{ width: '100%', background: `${theme.color.background3}` }} onClick={()=>navigate(`/post/issue/${issues[0]?.pk}`)}>
                        <Img style={{ backgroundImage: `url(${backUrl + issues[0]?.main_img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }} />
                        <div style={{ padding: '16px 16px 0 16px' }}>{issues[0]?.date} {issues[0]?.title}</div>
                        <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 16px 16px 16px' }}>{issues[0]?.hash}</div>
                    </div>
                </Content>
                <Title>하루 1종목</Title>
                <Content onClick={() => {navigate(`/post/oneevent/${oneWord?.pk}`) }}>
                    <div>{oneEvent.title}</div>
                    <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{oneEvent.hash}</div>
                </Content>
                <Title onClick={()=>{navigate('/masterlist')}}>퍼스트 전문가</Title>
                <SelectSubType className='subtype-container' style={{ top: '5.9rem' }}>
                    {masters.map((item, index) => (
                        <>
                            <SubType style={{ borderBottom: `2px solid ${index == subTypeNum ? theme.color.background1 : '#fff'}` }} onClick={() => { setSubTypeNum(index) }}>
                                {item.nickname}
                            </SubType>
                        </>
                    ))}
                </SelectSubType>

                {zMasterContent.map((item, idx) => (
                    <>
                        <LeftImgCard item={item} />
                    </>
                ))}

                <Title onClick={()=>{navigate('/themelist')}}>핵심 테마</Title>
                <Content>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {themes.map((item, idx) => (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '47.5%', background: `${theme.color.background3}` }} onClick={()=>navigate(`/post/theme/${item?.pk}`)}>
                                    <img src={backUrl + item.main_img} />
                                    <div style={{ padding: '16px', minHeight: '50px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: `${theme.size.font4}`, fontWeight: 'bold' }}>{item?.title}</div>
                                        <div style={{ fontSize: `${theme.size.font5}` }}>{item?.date}</div>
                                    </div>

                                </div>

                            </>
                        ))}
                    </div>

                </Content>
                <Title onClick={()=>{navigate('/videolist')}}>핵심 비디오</Title>
                <div style={{width:'100%',background:`${theme.color.background3}`,fontSize:`${theme.size.font4}`}} onClick={()=>{navigate(`/video/${videos.pk}`)}}>
                <img src={`https://img.youtube.com/vi/${videos.link}/mqdefault.jpg`} style={{width:'100%'}} />
                {/* <iframe style={{ width: '100%', height: 'auto', height: '80vw', maxHeight: '450px' }} src={`https://www.youtube.com/embed/${videos.link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
                <div style={{padding:'6px 0'}}>{videos.title}</div>
                <div style={{padding:'6px 0',fontSize:`${theme.size.font5}`}}>자세히보기 {'>'}</div>
                </div>
                </div>

            </Wrappers>
        </>
    )
}
export default Home;