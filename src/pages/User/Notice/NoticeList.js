import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Title, Wrappers, Content, SelectType } from "../../../components/elements/UserContentTemplete";
import theme from "../../../styles/theme";
import styled from "styled-components";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import ThemeCard from "../../../components/ThemeCard";
import { range } from "../../../functions/utils";

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
    const location = useLocation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(1)
    const [isWebView, setIsWebView] = useState(false)
    const [isNoticeNew, setIsNoticeNew] = useState(false)
    const [isAlarmNew, setIsAlarmNew] = useState(false);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            if (window && window.flutter_inappwebview) {
                setIsWebView(true);
                // let params = { 'table': "notice" };
                // await window.flutter_inappwebview.callHandler('native_alarm_count_zero', JSON.stringify(params)).then(async function (result) {
                //     //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                //     let ans = JSON.parse(result)
                //     if (ans['data']['alarm_cnt'] == 0 && ans['data']['notice_cnt'] == 0) {
                //         localStorage.setItem('is_alarm', 'false');
                //     } else {
                //         localStorage.setItem('is_alarm', 'true');
                //     }
                // });
            }
            let str = '';
            if (location.state == 'alarm') {
                str = '/api/items?table=alarm_log&order=pk&page=1&page_cut=10';
                setTypeNum(2);
            } else {
                str = '/api/items?table=notice&status=1&page=1&page_cut=10';
                setTypeNum(1);
            }
            const { data: response } = await axios.get(str);
            setPosts(response.data.data);
            setPageList(range(1, response?.data?.maxPage));
        }
        fetchPosts();
    }, [])

    // setInterval(() => {
    //     if (window.flutter_inappwebview) {
    //         window.flutter_inappwebview.callHandler('native_get_alarm_count', {}).then(async function (result) {
    //             //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
    //             let ans = JSON.parse(result)
    //             if (ans['data']['alarm_cnt'] > 0) {
    //                 setIsAlarmNew(true)
    //             } else {
    //                 setIsAlarmNew(false)
    //             }
    //             if (ans['data']['notice_cnt'] > 0) {
    //                 setIsNoticeNew(true)
    //             } else {
    //                 setIsNoticeNew(false)
    //             }
    //         });
    //     }
    // }, 1500);
    const changeType = async (num, page_num) => {
        setTypeNum(num);
        setPage(page_num);
        let str = "";
        str = `/api/items?table=` + (num == 1 ? 'notice&status=1' : 'alarm_log&order=pk')
        str += `&page=${page_num}&page_cut=10`
        const { data: response } = await axios.get(str);
        window.scrollTo(0, 0);
        setPosts(response.data.data);
        setPageList(range(1, response?.data?.maxPage));
        if (num == 1) {
            setIsNoticeNew(false)
        } else {
            setIsAlarmNew(false)
        }
        // if (window && window.flutter_inappwebview) {
        //     let params = { 'table': `${num == 1 ? 'notice' : 'alarm'}` };
        //     await window.flutter_inappwebview.callHandler('native_alarm_count_zero', JSON.stringify(params)).then(async function (result) {
        //         //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
        //         // JSON.parse(result)
        //         let ans = JSON.parse(result)
        //         if (ans['data']['alarm_cnt'] == 0 && ans['data']['notice_cnt'] == 0) {
        //             localStorage.setItem('is_alarm', 'false');
        //         } else {
        //             localStorage.setItem('is_alarm', 'true');
        //         }
        //     });
        // }
    }
    return (
        <>
            <Wrappers>

                <SelectType className="select-type">
                    <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1, 1) }}>공지사항
                        {/* {isNoticeNew ?
                                    <>
                                        <div style={{ width: '10px', height: '10px', background: 'red', position: 'absolute', top: '2px', right: '17px', borderRadius: '50%' }} />
                                    </>
                                    :
                                    <>
                                    </>
                                } */}
                    </Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2, 1) }}>알림
                        {/* {isAlarmNew ?
                                    <>
                                        <div style={{ width: '10px', height: '10px', background: 'red', position: 'absolute', top: '2px', right: '17px', borderRadius: '50%' }} />
                                    </>
                                    :
                                    <>
                                    </>
                                } */}
                    </Type>
                </SelectType>

                {/* <Title>공지사항</Title> */}

                {posts && posts.map((item, idx) => (
                    <Content onClick={() => { typeNum == 1 ? navigate(`/post/notice/${item?.pk}`) : window.location.href = `${item?.url}` }} style={{ borderBottom: '1px solid #cccccc', paddingBottom: '16px', cursor: 'pointer' }}>
                        <div >{item?.title ?? ""}</div>
                        <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{item?.date ?? ""}</div>
                    </Content>
                ))}
                <MBottomContent>
                    <div />
                    <PageContainer>
                        <PageButton onClick={() => changeType(typeNum, 1)}>
                            처음
                        </PageButton>
                        {pageList.map((item, index) => (
                            <>
                                <PageButton onClick={() => changeType(typeNum, item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                    {item}
                                </PageButton>
                            </>
                        ))}
                        <PageButton onClick={() => changeType(typeNum, pageList.length ?? 1)}>
                            마지막
                        </PageButton>
                    </PageContainer>
                    <div />
                </MBottomContent>
            </Wrappers>
        </>
    )
}
export default NoticeList;