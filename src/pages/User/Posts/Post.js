import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
const Post = () =>{
    const params = useParams();
    const [post, setPost] = useState({})
    useEffect(()=>{
        async function fetchPost(){
            const {data:response} = await axios.get(`/api/item?table=${params.table}&pk=${params.pk}`)
            let obj = response.data;
            $('.note').append(obj.note)
            obj.note = stringToHTML(obj.note)
            setPost(obj);
        }
        fetchPost();
    },[])
    const stringToHTML = (str) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };
    return (
        <>
        <Wrappers>
            <div style={{width:'100%',textAlign:'end'}}>{post.nickname} / {post?.date?.substring(5,10)} / 7,777</div>
            <img src={backUrl+post.main_img} style={{width:'100%',margin:'16px 0'}} />
            <div>{post.suggest_title}</div>
            <Title>{post.title}</Title>
            <div style={{fontSize:`${theme.size.font4}`,color:`${theme.color.font2}`}}>{post.hash}</div>
            <div className="note">
            </div>
        </Wrappers>
        </>
    )
}
export default Post;