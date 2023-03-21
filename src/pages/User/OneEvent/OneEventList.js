import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Wrappers, Content } from "../../../components/elements/UserContentTemplete";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import ThemeCard from "../../../components/ThemeCard";
import { range } from "../../../functions/utils";
import theme from "../../../styles/theme";

const OneEventList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    useEffect(() => {
        fetchPosts(1);
    }, [])
    async function fetchPosts(num) {
        setPage(num);
        const { data: response } = await axios.get(`/api/items?table=oneevent&status=1&page=${num}&page_cut=10`);
        window.scrollTo(0, 0);
        setPosts(response.data.data);
        setPageList(range(1, response?.data?.maxPage));
    }
    return (
        <>
            <Wrappers>
                <Title>하루 1종목</Title>
                {posts && posts.map((item, idx) => (
                    <Content onClick={() => { navigate(`/post/oneevent/${item?.pk}`) }} style={{ borderBottom: '1px solid #cccccc', paddingBottom: '16px' }}>
                        <div >{item?.title ?? ""}</div>
                        {/* <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{item?.hash ?? ""}</div> */}
                    </Content>
                ))}
                <MBottomContent>
                    <div />
                    <PageContainer>
                        <PageButton onClick={() => fetchPosts(1)}>
                            처음
                        </PageButton>
                        {pageList.map((item, index) => (
                            <>
                                <PageButton onClick={() => fetchPosts(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                    {item}
                                </PageButton>
                            </>
                        ))}
                        <PageButton onClick={() => fetchPosts(pageList.length ?? 1)}>
                            마지막
                        </PageButton>
                    </PageContainer>
                    <div />
                </MBottomContent>
            </Wrappers>
        </>
    )
}
export default OneEventList;