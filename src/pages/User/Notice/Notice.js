import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { BsFillShareFill } from 'react-icons/bs';
import logo from '../../../assets/images/test/logo.svg'
import { categoryToNumber } from "../../../functions/utils";
import CommentComponent from "../../../components/CommentComponent";
const Logo = styled.img`
position: fixed;
bottom: 0;
height:18px;
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
const Notice = () => {
    const params = useParams();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [percent, setPercent] = useState(0);
    const [auth, setAuth] = useState({})

    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=notice&pk=${params.pk}`)
            let obj = response.data;

            obj.note = stringToHTML(obj.note)
            $('.note').append(obj.note)
            $('.note > img').css("width", "100%")
            setPost(obj);

        }
        if (localStorage.getItem('auth')) {
            setAuth(JSON.parse(localStorage.getItem('auth')));
        } 
        fetchPost();
        fetchComments();
        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })
    }, [])
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk}&category=${categoryToNumber('notice')}`);
        setComments(response.data);
    }
    const stringToHTML = (str) => {
        let parser = new DOMParser();
        str = str.replaceAll('http://localhost:8001', backUrl);
        str = str.replaceAll('http://127.0.0.1:8001', backUrl);
        str = str.replaceAll('<img', '<img style="width:100%;" ');
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };
    const addComment = async () => {
        if(!$('.comment').val()){
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: params.pk,
            note: $('.comment').val(),
            category: categoryToNumber('notice')
        })

        if(response.result>0){
            $('.comment').val("")
            fetchComments();
        }else{
            alert(response.message)
        }
    }
    
    return (
        <>
            <Wrappers className="wrapper">
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', fontSize: `${theme.size.font4}` }}>
                        <div style={{ margin: '0 4px' }}>{post?.date?.substring(0, 10)}</div>
                </div>
                <Title>{post.title}</Title>
                <div className="note">
                </div>
                <CommentComponent addComment={addComment} data={comments}fetchComments={fetchComments} />
                <Progress value={`${percent}`} max="100"></Progress>
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Notice;