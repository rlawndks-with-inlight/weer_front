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
import { Wrappers, Title, Content, Card, Img } from '../../components/elements/UserContentTemplete';
import ThemeCard from '../../components/ThemeCard'
import VideoCard from '../../components/VideoCard';

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
    const [strategies, setStrategies] = useState([]);
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
            setStrategies(response.data.strategies)
            let video_list = response.data?.videos
            for (var i = 0; i < video_list.length; i++) {
                video_list[i].link = getIframeLinkByLink(video_list[i].link);
            }
            setVideos(video_list);
        }
        fetchPost();
    }, [])
    const onChangeStrategyNum = async (num, pk) => {
        setSubTypeNum(num)
        let str = `/api/items?table=strategy&limit=3`;
        if (pk != 0) {
            str += `&user_pk=${pk}`;
        }
        const { data: response } = await axios.get(str);
        setStrategies(response?.data)
    }
    return (
        <>
            <Wrappers>
                <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative', minHeight: '120px', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
                    {masters.map((item, idx) => (
                        <>
                            {idx < 4 ?
                                <>
                                    <ProFileImg1 src={backUrl + item.profile_img} style={{ position: 'absolute', bottom: `25px`, width: '100px', left: `${(idx + 1) * 21 - 20}%` }} />
                                </>
                                :
                                <>
                                    <ProFileImg2 src={backUrl + item.profile_img} style={{ position: 'absolute', bottom: `0`, width: '100px', left: `${(idx - 4) * 21 - 10}%` }} />
                                </>
                            }
                        </>
                    ))}
                </div>
                <Title className='pointer' onClick={() => { navigate('/onewordlist') }}>하루 1단어</Title>
                <Content onClick={() => { navigate(`/post/oneword/${oneWord?.pk}`) }} className='pointer'>
                    <div >{oneWord?.title ?? ""}</div>
                    <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{oneWord?.hash ?? ""}</div>
                </Content>
                <Title className='pointer' onClick={() => navigate('/selectissuecategory')}>핵심 이슈{'&'}공시</Title>
                <Content className='pointer'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {issues.map((item, idx) => (
                            <>
                                <Card onClick={() => navigate(`/post/issue/${item?.pk}`)}>
                                    <Img src={backUrl + item?.main_img} />
                                    <div style={{ padding: '16px 16px 0 16px' }}>{item?.date} {issues[0]?.title}</div>
                                    <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 16px 16px 16px' }}>{item?.hash}</div>
                                </Card>
                            </>
                        ))}
                    </div>
                </Content>
                <Title onClick={() => { navigate('/oneeventlist') }} className='pointer'>하루 1종목</Title>
                <Content onClick={() => { navigate(`/post/oneevent/${oneWord?.pk}`) }} className='pointer'>
                    <div>{oneEvent?.title}</div>
                    <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{oneEvent?.hash}</div>
                </Content>
                <Title onClick={() => { navigate('/masterlist') }} className='pointer'>퍼스트 전문가</Title>

                <SelectSubType className='subtype-container' style={{ marginBottom: '16px' }}>
                    <SubType style={{ borderBottom: `2px solid ${0 == subTypeNum ? theme.color.background1 : '#fff'}`, fontWeight: `${0 == subTypeNum ? 'bold' : 'normal'}` }} onClick={() => { onChangeStrategyNum(0, 0) }}>
                        All
                    </SubType>
                    {masters.map((item, index) => (
                        <>
                            <SubType style={{ borderBottom: `2px solid ${index + 1 == subTypeNum ? theme.color.background1 : '#fff'}`, fontWeight: `${index + 1 == subTypeNum ? 'bold' : 'normal'}` }} onClick={() => { onChangeStrategyNum(index + 1, item.pk) }}>
                                {item.nickname}
                            </SubType>
                        </>
                    ))}
                </SelectSubType>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {strategies.map((item, idx) => (
                        <>
                            <ThemeCard item={item} category='strategy' />
                        </>
                    ))}
                </div>
                <Title onClick={() => { navigate('/themelist') }}>핵심 테마</Title>
                <Content>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

                        {themes.map((item, idx) => (
                            <>
                                <Card onClick={() => navigate(`/post/theme/${item?.pk}`)}>
                                    <Img src={backUrl + item.main_img} />
                                    <div style={{ padding: '16px', minHeight: '50px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ fontSize: `${theme.size.font4}`, fontWeight: 'bold' }}>{item?.title}</div>
                                        <div style={{ fontSize: `${theme.size.font5}` }}>{item?.date}</div>
                                    </div>

                                </Card>

                            </>
                        ))}
                    </div>

                </Content>
                <Title onClick={() => { navigate('/videolist') }}>핵심 비디오</Title>
                <Content>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {videos.map((item, idx) => (
                            <>
                                <VideoCard item={item} />
                            </>
                        ))}
                    </div>
                </Content>

            </Wrappers>
        </>
    )
}
export default Home;