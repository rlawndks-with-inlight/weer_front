import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Wrappers, Content } from "../../../components/elements/UserContentTemplete";
import theme from "../../../styles/theme";
import styled from "styled-components";

const SelectType = styled.div`
display:flex;
width:100%;
z-index:5;
background:#fff;
margin-bottom:16px;
`
const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
position:relative;
`
const NoticeList = (props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(1)
    const [isWebView, setIsWebView] = useState(false)
    useEffect(() => {
        async function fetchPosts() {
            if (window && window.flutter_inappwebview) {
                setIsWebView(true);
                console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                let params = { 'table': "notice" };
                await window.flutter_inappwebview.callHandler('native_alarm_count_zero', JSON.stringify(params)).then(async function (result) {
                    //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                    let ans = JSON.parse(result)
                    console.log("aa#")
                    if (ans['data']['alarm_cnt'] == 0 && ans['data']['notice_cnt'] == 0) {
                        localStorage.setItem('is_alarm', 'false');
                    } else {
                        localStorage.setItem('is_alarm', 'true');
                    }
                });
            }
            const { data: response } = await axios.get('/api/items?table=notice&status=1');
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
    const changeType = async (num) => {
        setTypeNum(num);
        let str = "";
        str = `/api/items?table=` + (num == 1 ? 'notice' : 'alarm')
        const { data: response } = await axios.get(str);
        setPosts(response.data);
        if (window && window.flutter_inappwebview) {
            let params = { 'table': `${num == 1 ? 'notice' : 'alarm'}` };
            await window.flutter_inappwebview.callHandler('native_alarm_count_zero', JSON.stringify(params)).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                // JSON.parse(result)
                let ans = JSON.parse(result)
                console.log("aa#")
                if (ans['data']['alarm_cnt'] == 0 && ans['data']['notice_cnt'] == 0) {
                    localStorage.setItem('is_alarm', 'false');
                } else {
                    localStorage.setItem('is_alarm', 'true');
                }
            });
        }
    }
    return (
        <>
            <Wrappers>
                {isWebView ?
                    <>
                        <SelectType>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1) }}>공지사항</Type>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2) }}>알림</Type>
                        </SelectType>
                    </>
                    :
                    <>
                        <Title>공지사항</Title>
                    </>
                }
                {posts.map((item, idx) => (
                    <Content onClick={() => { typeNum == 1 ? navigate(`/post/notice/${item?.pk}`) : console.log("") }} style={{ borderBottom: '1px solid #cccccc', paddingBottom: '16px', cursor: 'pointer' }}>
                        <div >{item?.title ?? ""}</div>
                        <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{item?.date ?? ""}</div>
                    </Content>
                ))}
            </Wrappers>
        </>
    )
}
export default NoticeList;