import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Title, ViewerContainer, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { BsFillShareFill } from 'react-icons/bs';
import { commarNumber, categoryToNumber, getViewerAlignByNumber } from "../../../functions/utils";
import CommentComponent from "../../../components/CommentComponent";
import { Viewer } from '@toast-ui/react-editor';
import Loading from '../../../components/Loading'
import MetaTag from "../../../components/MetaTag";

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
const Post = (props) => {
    let { post_pk, post_table } = props;
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [percent, setPercent] = useState(0);
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(false)
    const [postPk, setPostPk] = useState(0);
    const [postTable, setPostTable] = useState('');
    const returnTitle = (ttl) => {
        if (postTable == 'notice') {
            return "weare-first - 위아 : 퍼스트 파트너스 - 공지사항 / " + ttl;
        } else if (postTable == 'issue') {
            return "weare-first - 위아 : 퍼스트 파트너스 - 핵심이슈 / " + ttl;
        } else if (postTable == 'theme') {
            return "weare-first - 위아 : 퍼스트 파트너스 - 핵심테마 / " + ttl;
        } else if (postTable == 'feature') {
            return "weare-first - 위아 : 퍼스트 파트너스 - 특징주 / " + ttl;
        } else if (postTable == 'oneevent') {
            return "weare-first - 위아 : 퍼스트 파트너스 - 하루1종목 / " + ttl;
        } else if (postTable == 'oneword') {
            return "weare-first - 위아 : 퍼스트 파트너스 - 하루1단어 / " + ttl;
        } else if (postTable == 'strategy') {
            return "weare-first - 위아 : 퍼스트 파트너스 - 전문가칼럼 / " + ttl;
        } else {
            return "weare-first - 위아 : 퍼스트 파트너스";
        }
    }
    useEffect(() => {

        async function fetchPost() {
            setLoading(true)
            setPostPk(params.pk || post_pk)
            setPostTable(params.table || post_table)
            const { data: response } = await axios.get(`/api/item?table=${params.table || post_table}&pk=${params.pk || post_pk}&views=1`);

            let obj = response.data;
            setPost(obj);
            await new Promise((r) => setTimeout(r, 100));
            setTimeout(() => setLoading(false), 1000);
            await new Promise((r) => setTimeout(r, 1100));
            if (localStorage.getItem('dark_mode')) {
                $('body').addClass("dark-mode");
                $('p').addClass("dark-mode");
                $('.toastui-editor-contents p').attr("style", "color:#fff!important");
                $('.menu-container').addClass("dark-mode");
                $('.header').addClass("dark-mode");
                $('.select-type').addClass("dark-mode");
                $('.wrappers > .viewer > p').addClass("dark-mode");
                $('.footer').addClass("dark-mode");
                $('.viewer > div > div > div > p').addClass("dark-mode");
            }
        }
        if ((params.table || post_table) != 'notice') {
            myAuth();
        }

        fetchPost();
        fetchComments();

        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })

    }, [])
    const myAuth = async () => {
        const { data: response } = await axios('/api/auth')
        if (response.pk > 0 && response.user_level >= 0) {
            setAuth(response);
        } else {
            if (response.user_level < 0) {
                alert("접근 권한이 없습니다.");
            }
            if (response.pk < 0) {
                alert("로그인이 필요한 서비스입니다.");
            }
            navigate('/login');
        }
    }
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk || post_pk}&category=${categoryToNumber(params.table || post_table)}`);
        setComments(response.data);
    }

    const addComment = async (parent_pk) => {
        if (!$(`.comment-${parent_pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: postPk,
            parentPk: parent_pk ?? 0,
            title: post.title,
            note: $(`.comment-${parent_pk ?? 0}`).val(),
            category: categoryToNumber(postTable)
        })

        if (response.result > 0) {
            $(`.comment-${parent_pk ?? 0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                url: 'https://weare-first.com' + location.pathname,
            });
        } else {
            alert("공유하기가 지원되지 않는 환경 입니다.")
        }
    }

    return (
        <>
            <Wrappers className="wrapper">
                <MetaTag title={returnTitle(post?.title ?? "")} />
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
                        <img src={backUrl + post.main_img} style={{ width: '100%', margin: '16px 0' }} alt="#" />
                        <Title not_arrow={true}>{post.title}</Title>
                        <div style={{ fontSize: `${theme.size.font4}`, color: `${theme.color.font2}` }}>{post.hash}</div>
                        <ViewerContainer className="viewer" style={{ textAlign: `${getViewerAlignByNumber(post?.note_align)}` }}>
                            <Viewer initialValue={post?.note ?? `<body></body>`} />
                        </ViewerContainer>

                        <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} />

                    </>}

                <Progress value={`${percent}`} max="100"></Progress>
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Post;