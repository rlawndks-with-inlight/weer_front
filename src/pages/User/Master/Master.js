import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { getIframeLinkByLink } from "../../../functions/utils";
import { backUrl } from "../../../data/Data";
import VideoCard from "../../../components/VideoCard";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import { range } from "../../../functions/utils";

const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
`
const Card2 = styled.div`
width:100%;
background:${props => props.theme.color.background3};
text-align:left;
height:112px;
margin:6px 0;
color:${props => props.theme.color.font1};
font-weight:bold;
font-size:${props => props.theme.size.font3};
cursor:pointer;
position:relative;
`
const Master = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(undefined)
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [master, setMaster] = useState({});
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    useEffect(() => {

        getMaster();
    }, [])
    const getMaster = async () => {
        const { data: master_response } = await axios.get(`/api/item?table=user&pk=${params.pk}`);
        setMaster(master_response?.data)
        changeType(params?.type ?? 1, 1);
    }

    const changeType = async (num, page_num) => {
        setTypeNum(num);
        setPage(page_num);
        let str = "";
        if (num == 1) {
            str = `/api/items?table=strategy&user_pk=${params.pk}&status=1`
            str += `&page=${page_num}&page_cut=10`
            const { data: response } = await axios.get(str);
            setPosts(response.data.data);
            setPageList(range(1, response?.data?.maxPage));

        } else {
            str = `/api/items?table=video&user_pk=${params.pk}&status=1`
            str += `&page=${page_num}&page_cut=10`
            const { data: response } = await axios.get(str);
            let list = response.data.data;
            for (var i = 0; i < list.length; i++) {
                list[i].link = getIframeLinkByLink(list[i].link);
            }
            setPosts(list);
            setPageList(range(1, response?.data?.maxPage));

        }
        window.scrollTo(0, 0);
        window.history.pushState(null, null, `/master/${params.pk}/${num}`)
    }
    return (
        <>
            <Wrappers>
                <Card2 onClick={() => { }}>
                    <div style={{ width: '50%', padding: '20px' }}>
                        <div>{master?.nickname}</div>
                        <div style={{ fontSize: `${theme.size.font5}`, marginTop: '8px', color: `${theme.color.font2}` }}>{master?.name} 전문가</div>
                    </div>
                    <img style={{ position: 'absolute', bottom: '0', right: '5%', height: '80%' }} alt="#" src={backUrl + master?.profile_img} />
                </Card2>
                <SelectType className="select-type">
                    <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1, 1) }}>전문가칼럼</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2, 1) }}>핵심비디오</Type>
                </SelectType>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {posts && posts.map((item, idx) => (
                        <>
                            {typeNum == 1 ?
                                <>

                                    <ThemeCard item={item} category={'strategy'} />

                                </>
                                :
                                <>
                                    <VideoCard item={item} />
                                </>
                            }
                        </>
                    ))}
                </div>
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
export default Master;