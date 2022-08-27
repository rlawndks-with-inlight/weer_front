import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import { backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { getIframeLinkByLink } from "../../../functions/utils";
import $ from 'jquery';
const Video = () =>{
    const params = useParams();
    const [post, setPost] = useState({})
    useEffect(()=>{
        async function fetchPost(){
            const {data:response} = await axios.get(`/api/item?table=video&pk=${params.pk}`)
            let obj = response.data;
            obj.link = getIframeLinkByLink(obj.link);
            obj.note = stringToHTML(obj.note)
            $('.note').append(obj.note)
            setPost(obj);
        }
        fetchPost();
    },[])
    const stringToHTML = (str) => {
        let parser = new DOMParser();
        str = str.replaceAll('http://localhost:8001',backUrl);
        str = str.replaceAll('http://127.0.0.1:8001',backUrl);
        str = str.replaceAll('<img','<img style="width:100%;" ');
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };
    return(
        <>
        <Wrappers>
            <div style={{width:'100%',textAlign:'end'}}>{post.nickname} / {post?.date?.substring(5,10)} / 7,777</div>
            <Title>{post.title}</Title>
            <iframe style={{ width: '100%', height: 'auto', height: '80vw', maxHeight: '450px' }} src={`https://www.youtube.com/embed/${post.link}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> 
            <div style={{fontSize:`${theme.size.font4}`,color:`${theme.color.font2}`}}>{post.hash}</div>
            <div className="note">
            </div>
        </Wrappers>
        </>
    )
}
export default Video;