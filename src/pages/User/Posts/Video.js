import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Title, Wrappers, ViewerContainer } from "../../../components/elements/UserContentTemplete";
import { backUrl, slideSetting } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { categoryToNumber, commarNumber, getIframeLinkByLink, getViewerAlignByNumber } from "../../../functions/utils";
import $ from 'jquery';
import { Content, SliderDiv, WrapDiv } from "../../../components/elements/UserContentTemplete";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoCard from "../../../components/VideoCard";
import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Viewer } from '@toast-ui/react-editor';
import Loading from '../../../components/Loading'
import CommentComponent from "../../../components/CommentComponent";
import MetaTag from "../../../components/MetaTag";
import { BsFillShareFill } from 'react-icons/bs';
import ZoomButton from "../../../components/ZoomButton";


const Iframe = styled.iframe`
width: 100%;
height: auto;
height: 80vw;
max-height: 500px;
max-width: 750px;
margin: 0 auto;
`
const Progress = styled.progress`

    appearance: none;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    height:16px;

::-webkit-progress-bar {
    background: #f0f0f0;
    border-radius: 0;
}

::-webkit-progress-value {
    background:transparent;
    border-bottom: 16px solid #4CDAD8;
    border-right: 10px solid transparent;
}
`
const NextArrow = ({ onClick }) => {
    return (
        <div className="nextArrow" onClick={onClick}>
            <MdNavigateNext style={{ color: '#fff' }} />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="prevArrow" onClick={onClick}>
            <MdNavigateBefore style={{ color: '#fff' }} />
        </div>
    );
};

const Video = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = useLocation();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [latests, setLatests] = useState([]);
    const [relates, setRelates] = useState([]);
    const [percent, setPercent] = useState(0);
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(false)

    const settings = {
        infinite: false,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow onClick />,
        prevArrow: <PrevArrow onClick />,
    };
    useEffect(() => {
        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })
    }, [])
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get(`/api/getvideocontent?pk=${params.pk}&views=1`);
            let obj = response.data.video;
            obj.link = getIframeLinkByLink(obj.link);
            setPost(obj);
            let relate_list = response.data?.relates ?? [];
            for (var i = 0; i < relate_list.length; i++) {
                relate_list[i].link = getIframeLinkByLink(relate_list[i].link);
            }
            setRelates(relate_list);
            let video_list = response.data?.latests ?? []
            for (var i = 0; i < video_list.length; i++) {
                video_list[i].link = getIframeLinkByLink(video_list[i].link);
            }
            setLatests(video_list);
            await new Promise((r) => setTimeout(r, 100));
            setTimeout(() => setLoading(false), 1000);
            await new Promise((r) => setTimeout(r, 1100));
            if (localStorage.getItem('dark_mode')) {
                $('body').addClass("dark-mode");
                $('p').addClass("dark-mode");
                $('.toastui-editor-contents p').attr("style", "color:#fff!important");
                $('.toastui-editor-contents span').attr("style", "color:#fff!important");
                $('.menu-container').addClass("dark-mode");
                $('.header').addClass("dark-mode");
                $('.select-type').addClass("dark-mode");
                $('.wrappers > .viewer > p').addClass("dark-mode");
                $('.footer').addClass("dark-mode");
                $('.viewer > div > div > div > p').addClass("dark-mode");
            }
        }
        if (localStorage.getItem('auth')) {
            setAuth(JSON.parse(localStorage.getItem('auth')));

        }
        myAuth();
        fetchPost();
        fetchComments();
    }, [pathname])
    const myAuth = async () => {
        const { data: response } = await axios('/api/auth')
        if (response.pk > 0) {
            setAuth(response);
        } else {
            alert("로그인이 필요한 서비스입니다.");
            navigate('/login');
        }
    }
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk}&category=${categoryToNumber('video')}`);
        setComments(response.data);
    }

    const addComment = async (parent_pk) => {
        if (!auth.pk) {
            alert("로그인 후 이용 가능합니다.")
            return;
        }
        if (!$(`.comment-${parent_pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: params.pk,
            parentPk:parent_pk??0,
            title: post.title,
            note: $(`.comment-${parent_pk??0}`).val(),
            category: categoryToNumber('video')
        })

        if (response.result > 0) {
            $(`.comment-${parent_pk??0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                url: 'https://weare-first.com'+location.pathname,
            });
        } else {
            alert("공유하기가 지원되지 않는 환경 입니다.")
        }
    }
    return (
        <>
            <Wrappers className="post-container">
                <MetaTag title={'weare-first - 위아 : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 핵심비디오 / ' + post?.title ?? ""} />

                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', fontSize: `${theme.size.font4}` }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ margin: '0 4px' }}>{post.nickname}</div> /
                                <div style={{ margin: '0 4px' }}>{post?.date?.substring(0, 10)}</div> /
                                <div style={{ margin: '0 8px 0 4px' }}>조회수 {commarNumber(post?.views ?? 0)}</div>
                                <BsFillShareFill style={{ cursor: 'pointer' }} onClick={handleShare} />
                            </div>
                        </div>
                        <Title not_arrow={true}>{post.title}</Title>
                        <Iframe src={`https://www.youtube.com/embed/${post.link}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

                        </Iframe>
                        <div style={{ fontSize: `${theme.size.font4}`, color: `${theme.color.font2}` }}>{post.hash}</div>
                        <ViewerContainer className="viewer" style={{textAlign:`${getViewerAlignByNumber(post?.note_align)}`}}>
                            <Viewer initialValue={post?.note ?? `<body></body>`} />
                        </ViewerContainer>
                        <Title>관련 영상</Title>
                        <Content>
                            <WrapDiv>
                                {relates.map((item, idx) => (
                                    <>
                                        <VideoCard item={item} />
                                    </>
                                ))}
                            </WrapDiv>
                            <SliderDiv>
                                <Slider {...slideSetting} className='board-container'>
                                    {relates.map((item, idx) => (
                                        <>
                                            <VideoCard item={item} isSlide={true} isImgPadding={true} />
                                        </>
                                    ))}
                                </Slider>
                            </SliderDiv>
                        </Content>
                        <Title>최신 영상</Title>
                        <Content>
                            <WrapDiv>
                                {latests.map((item, idx) => (
                                    <>
                                        <VideoCard item={item} />
                                    </>
                                ))}
                            </WrapDiv>
                            <SliderDiv>
                                <Slider {...slideSetting} className='board-container'>
                                    {latests.map((item, idx) => (
                                        <>
                                            <VideoCard item={item} isSlide={true} isImgPadding={true} />
                                        </>
                                    ))}
                                </Slider>
                            </SliderDiv>
                        </Content>
                        <ZoomButton/>
                        <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} />

                    </>
                }

                <Progress value={`${percent}`} max="100"></Progress>
                {/* <Logo src={logo} style={{left:`${percent*0.94}%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Video;