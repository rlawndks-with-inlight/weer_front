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
import axios from 'axios';
import { backUrl, slideSetting } from '../../data/Data';
import { getIframeLinkByLink } from '../../functions/utils';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv } from '../../components/elements/UserContentTemplete';
import ThemeCard from '../../components/ThemeCard'
import VideoCard from '../../components/VideoCard';
import Loading from '../../components/Loading';

const Home = () => {
    const navigate = useNavigate();
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([]);
    const [setting, setSetting] = useState({});
    const [masters, setMasters] = useState([])
    const [oneWord, setOneWord] = useState({});
    const [issues, setIssues] = useState([]);
    const [oneEvent, setOneEvent] = useState({});
    const [themes, setThemes] = useState([]);
    const [videos, setVideos] = useState([]);
    const [strategies, setStrategies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState([])


    const settings = {
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        setPosts(zTalk[0].image_list);
        async function fetchPost() {
            setLoading(true)

            const { data: response } = await axios.get('/api/gethomecontent')
            setSetting(response.data.setting);
            setMasters(response.data.masters)
            setOneWord(response.data.oneWord);
            setIssues(response.data.issues);
            //setOneEvent(response.data.oneEvent);
            setStrategies(response.data.strategies);
            setFeatures(response.data.features);
            setThemes(response.data.themes);
            let video_list = response.data?.videos
            for (var i = 0; i < video_list.length; i++) {
                video_list[i].link = getIframeLinkByLink(video_list[i].link);
            }
            setVideos(video_list);
            setTimeout(() => setLoading(false), 1500);
        }
        fetchPost();
        async function isLogined(){
            await window.flutter_inappwebview.callHandler('native_app_logined',{}).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                // JSON.parse(result)

                let obj = JSON.parse(result);
                await onLoginBySns(obj.data);
            });
        }
        if (window && window.flutter_inappwebview) {
            isLogined();
        }
    }, [])
    const onChangeStrategyNum = async (num, pk) => {
        setSubTypeNum(num)
        let str = `/api/items?table=strategy&limit=3&status=1`;
        if (pk != 0) {
            str += `&user_pk=${pk}`;
        }
        const { data: response } = await axios.get(str);
        setStrategies(response?.data)
    }
    const onLoginBySns = async (obj) => {
        let nick = "";
        if (obj.login_type == 1) {
            nick = "카카오" + new Date().getTime();
        } else if (obj.login_type == 2) {
            nick = "네이버" + new Date().getTime();
        }
        let objs = {
            id: obj.id,
            name: obj.legal_name,
            nickname: nick,
            phone: obj.phone_number,
            user_level: 0,
            typeNum: obj.login_type,
            profile_img: obj.profile_image_url
        }
        const { data: response } = await axios.post('/api/loginbysns', objs);
        if (response.result > 0) {
            await localStorage.setItem('auth', JSON.stringify(response.data));
        } else {
            //alert(response.message);
        }
    }
    /*
    const snsLogin = () => {
        if (window && window.flutter_inappwebview) {
            window.flutter_inappwebview.callHandler('native_app_logined').then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                // JSON.parse(result)
                let obj = JSON.parse(result);
                await onLoginBySns(obj.data);
            });
        } else {
        }
    }
    */
    return (
        <>
            <Wrappers className='wrappers'>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <Content>
                            <img src={backUrl + setting?.main_img} alt="#" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }} />
                        </Content>
                        <Title className='pointer' link={'/onewordlist'}>하루 1단어</Title>
                        <Content onClick={() => { navigate(`/post/oneword/${oneWord?.pk}`) }} className='pointer'>
                            <div >{oneWord?.title ?? ""}</div>
                            <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{oneWord?.hash ?? ""}</div>
                        </Content>
                        <Title className='pointer' link={'/selectissuecategory'} >핵심 이슈{'&'}공시</Title>
                        <Content>
                            <WrapDiv>
                                {issues.map((item, idx) => (
                                    <>
                                        <Card onClick={() => navigate(`/post/issue/${item?.pk}`)} className='pointer'>
                                            <Img src={backUrl + item?.main_img} alt="#" />
                                            <div style={{ padding: '16px 16px 0 16px', height: '70px', fontWeight: 'bold' }}> {item?.title}</div>
                                            <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 16px 16px 16px' }}>{item?.hash}</div>
                                        </Card>
                                    </>
                                ))}

                            </WrapDiv>
                            <SliderDiv>
                                <Slider {...slideSetting} className='board-container pointer'>
                                    {issues.map((item, idx) => (
                                        <>
                                            <Card onClick={() => navigate(`/post/issue/${item?.pk}`)} style={{ color: `${item?.font_color}`, background: `${item?.background_color}`, width: `${window.innerWidth <= 600 ? '95%' : ''}` }} >
                                                <Img src={backUrl + item?.main_img} alt="#" />
                                                <div style={{ padding: '16px', height: '70px', fontWeight: 'bold' }}> {item?.title}</div>
                                                <div style={{ fontSize: `${theme.size.font4}`, padding: '8px 16px', height: '50px' }}>{item?.hash}</div>
                                            </Card>
                                        </>
                                    ))}
                                </Slider>
                            </SliderDiv>
                        </Content>
                        {/* <Title link={'/oneeventlist'} className='pointer'>하루 1종목</Title>
                        <Content onClick={() => { navigate(`/post/oneevent/${oneEvent?.pk}`) }} className='pointer'>
                            <div>{oneEvent?.title}</div>
                            <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{oneEvent?.hash}</div>
                        </Content> */}
                        <Title link={'/masterlist'} className='pointer'>전문가 칼럼</Title>

                        <SelectSubType className='subtype-container' style={{ marginBottom: '16px' }}>
                            <SubType style={{ borderBottom: `2px solid ${0 == subTypeNum ? theme.color.background1 : '#fff'}`, fontWeight: `${0 == subTypeNum ? 'bold' : 'normal'}` }} onClick={() => { onChangeStrategyNum(0, 0) }}>
                                All
                            </SubType>
                            {masters && masters.map((item, index) => (
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
                        <Title link={'/selectfeaturecategory'}>특징주</Title>
                        <Content>
                            <WrapDiv>
                                {features.map((item, idx) => (
                                    <>
                                        <Card onClick={() => navigate(`/post/feature/${item?.pk}`)} >
                                            <Img src={backUrl + item?.main_img} alt="#" />
                                            <div style={{ padding: '16px 16px 0 16px', height: '70px', fontWeight: 'bold' }}> {item?.title}</div>
                                            <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 16px 16px 16px' }}>{item?.hash}</div>
                                        </Card>
                                    </>
                                ))}

                            </WrapDiv>
                            <SliderDiv>
                                <Slider {...slideSetting} className='board-container'>
                                    {features.map((item, idx) => (
                                        <>
                                            <Card onClick={() => navigate(`/post/feature/${item?.pk}`)} style={{ color: `${item?.font_color}`, background: `${item?.background_color}`, width: `${window.innerWidth <= 600 ? '95%' : ''}` }} >
                                                <Img src={backUrl + item?.main_img} alt="#" />
                                                <div style={{ padding: '16px', height: '70px', fontWeight: 'bold' }}> {item?.title}</div>
                                                <div style={{ fontSize: `${theme.size.font4}`, padding: '8px 16px', height: '50px' }}>{item?.hash}</div>
                                            </Card>
                                        </>
                                    ))}
                                </Slider>
                            </SliderDiv>
                        </Content>
                        <Title link={'/themelist'}>핵심 테마</Title>
                        <Content>
                            <WrapDiv>
                                {themes.map((item, idx) => (
                                    <>
                                        <Card onClick={() => navigate(`/post/theme/${item?.pk}`)} >
                                            <Img src={backUrl + item?.main_img} alt="#" />
                                            <div style={{ padding: '16px 16px 0 16px', height: '70px', fontWeight: 'bold' }}> {item?.title}</div>
                                            <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 16px 16px 16px' }}>{item?.hash}</div>
                                        </Card>
                                    </>
                                ))}

                            </WrapDiv>
                            <SliderDiv>
                                <Slider {...slideSetting} className='board-container'>
                                    {themes.map((item, idx) => (
                                        <>
                                            <Card onClick={() => navigate(`/post/theme/${item?.pk}`)} style={{ color: `${item?.font_color}`, background: `${item?.background_color}`, width: `${window.innerWidth <= 600 ? '95%' : ''}` }} >
                                                <Img src={backUrl + item?.main_img} alt="#" />
                                                <div style={{ padding: '16px', height: '70px', fontWeight: 'bold' }}> {item?.title}</div>
                                                <div style={{ fontSize: `${theme.size.font4}`, padding: '8px 16px', height: '50px' }}>{item?.hash}</div>
                                            </Card>
                                        </>
                                    ))}
                                </Slider>
                            </SliderDiv>
                        </Content>
                        
                        <Title link={'/videolist'}>핵심 비디오</Title>
                        <Content>
                            <WrapDiv>
                                {videos.map((item, idx) => (
                                    <>
                                        <VideoCard item={item} isImgPadding={true} />
                                    </>
                                ))}
                            </WrapDiv>
                            <SliderDiv>
                                <Slider {...slideSetting} className='board-container'>
                                    {videos.map((item, idx) => (
                                        <>
                                            <VideoCard item={item} paddingBottom={'32px'} isSlide={true} isImgPadding={true} isTerm={true} />
                                        </>
                                    ))}
                                </Slider>
                            </SliderDiv>
                        </Content>
                    </>}


            </Wrappers>
        </>
    )
}
export default Home;