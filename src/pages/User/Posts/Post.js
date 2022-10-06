import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title, ViewerContainer, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { BsFillShareFill } from 'react-icons/bs';
import { commarNumber, categoryToNumber } from "../../../functions/utils";
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
const Post = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [percent, setPercent] = useState(0);
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(false)
    const returnTitle = (ttl) =>{
        if(params.table=='notice'){
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 공지사항 / "+ttl;
        }else if(params.table=='issue'){
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 핵심이슈 / "+ttl;
        }else if(params.table=='theme'){
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 핵심테마 / "+ttl;
        }else if(params.table=='feature'){
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 특징주 / "+ttl;
        }else if(params.table=='oneevent'){
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 하루1종목 / "+ttl;
        }else if(params.table=='oneword'){
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 하루1단어 / "+ttl;
        }else if(params.table=='strategy'){
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오 - 전문가칼럼 / "+ttl;
        }else{
            return "weare-first : 퍼스트 파트너스 | 주식 | 특징주 | 핵심이슈 | 핵심비디오";
        }
    }
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            const { data: response } = await axios.get(`/api/item?table=${params.table}&pk=${params.pk}&views=1`);
            
            let obj = response.data;
            obj.note = obj.note.replaceAll('http://localhost:8001', backUrl);
            setPost(obj);
            await new Promise((r) => setTimeout(r, 100));
            setTimeout(() => setLoading(false), 1000);
        }
        if (params.table != 'notice') {
            if (localStorage.getItem('auth')) {
                setAuth(JSON.parse(localStorage.getItem('auth')));
                fetchPost();
                fetchComments();
            } else {
                alert('로그인 후 이용 가능합니다.');
                navigate(-1);
            }
        } else {
            fetchPost();
            fetchComments();
        }
        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })
    }, [])
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk}&category=${categoryToNumber(params.table)}`);
        setComments(response.data);
    }
    
    const addComment = async () => {
        if (!$('.comment').val()) {
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: params.pk,
            note: $('.comment').val(),
            category: categoryToNumber(params.table)
        })

        if (response.result > 0) {
            $('.comment').val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    return (
        <>
            <Wrappers className="wrapper">
                <MetaTag title={returnTitle(post?.title??"")} />
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', fontSize: `${theme.size.font4}` }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ margin: '0 4px' }}>{post.nickname}</div> /
                                <div style={{ margin: '0 4px' }}>{post?.date?.substring(5, 10)}</div> /
                                <div style={{ margin: '0 8px 0 4px' }}>{commarNumber(post?.views ?? 0)}</div>
                                <BsFillShareFill style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        <img src={backUrl + post.main_img} style={{ width: '100%', margin: '16px 0' }}  alt="#" />
                        <Title not_arrow={true}>{post.title}</Title>
                        <div style={{ fontSize: `${theme.size.font4}`, color: `${theme.color.font2}` }}>{post.hash}</div>
                        <ViewerContainer>
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