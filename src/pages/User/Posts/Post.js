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
import { commarNumber, categoryToNumber, getViewerAlignByNumber, getViewerMarginByNumber } from "../../../functions/utils";
import CommentComponent from "../../../components/CommentComponent";
import { Viewer } from '@toast-ui/react-editor';
import Loading from '../../../components/Loading'
import MetaTag from "../../../components/MetaTag";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ZoomButton from "../../../components/ZoomButton";

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
        async function isLogined() {
            await window.flutter_inappwebview.callHandler('native_app_logined', {}).then(async function (result) {
              //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
              // JSON.parse(result)
              let obj = JSON.parse(result);
              if (obj['is_ios']) {
                await localStorage.setItem('is_ios', '1');
              }
              await onLoginBySns(obj.data);
            });
          }
          if (window && window.flutter_inappwebview && !localStorage.getItem('auth')) {
            isLogined();
          }
        async function fetchPost() {
            setLoading(true)
            setPostPk(params.pk || post_pk)
            setPostTable(params.table || post_table)
            const { data: response } = await axios.get(`/api/item?table=${params.table || post_table}&pk=${params.pk || post_pk}&views=1`);
            if(response.result<0){
                alert(response.message);
                if(response.result==-150){
                    navigate('/login')
                }else{
                    navigate(-1);
                }
            }
            let obj = response.data??{};
            obj.note = obj?.note.replaceAll('<p><br></p>','<br>');
            
            await new Promise((r) => setTimeout(r, 300));
            setPost(obj);
            await new Promise((r) => setTimeout(r, 100));
            setTimeout(() => setLoading(false), 1000);
            await new Promise((r) => setTimeout(r, 1500));
            
            if (localStorage.getItem('dark_mode')) {
                $('body').addClass("dark-mode");
                $('p').addClass("dark-mode");
                $('.toastui-editor-contents p').attr("style", "color:#ffffff !important");
                $('.toastui-editor-contents h1').attr("style", "color:#ffffff !important");
                $('.toastui-editor-contents h2').attr("style", "color:#ffffff !important");
                $('.toastui-editor-contents h3').attr("style", "color:#ffffff !important");
                $('.toastui-editor-contents h4').attr("style", "color:#ffffff !important");
                $('.toastui-editor-contents h5').attr("style", "color:#ffffff !important");
                $('.menu-container').addClass("dark-mode");
                $('.header').addClass("dark-mode");
                $('.select-type').addClass("dark-mode");
                $('.wrappers > .viewer > p').addClass("dark-mode");
                $('.footer').addClass("dark-mode");
                $('.viewer > div > div > div > p').addClass("dark-mode");
            }
        }
        if ((params.table || post_table) != 'notice') {
        }

        fetchPost();
        fetchComments();

        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })
        
    }, [])
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
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk || post_pk}&category=${categoryToNumber(params.table || post_table)}`);
        setComments(response.data);
    }

    const addComment = async (parent_pk) => {
        if (!$(`.comment-${parent_pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
            return;

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
    const updateComment = async (pk) => {
        if (!$(`.update-comment-${pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/updatecomment', {
            pk: pk,
            note: $(`.update-comment-${pk ?? 0}`).val(),
            category: categoryToNumber(postTable)
        })

        if (response.result > 0) {
            $(`.update-comment-${pk ?? 0}`).val("")
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
            <Wrappers className="post-container">
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
                        <ViewerContainer className="viewer" style={{margin:`${getViewerMarginByNumber(post?.note_align)}`}}>
                            <Viewer initialValue={post?.note ?? `<body></body>`} />
                        </ViewerContainer>
                        <ZoomButton/>
                        <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} updateComment={updateComment} />

                    </>}

                <Progress value={`${percent}`} max="100"></Progress>
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Post;