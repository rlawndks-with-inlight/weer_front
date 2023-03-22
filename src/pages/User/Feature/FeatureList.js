import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageButton from "../../../components/elements/pagination/PageButton";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import ThemeCard from "../../../components/ThemeCard";
import { range } from "../../../functions/utils";
import theme from "../../../styles/theme";


const FeatureList = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    useEffect(() => {
        fetchPosts(1);
    }, [])
    async function fetchPosts(num) {
        setPage(num);
        const { data: response } = await axios.get(`/api/items?table=feature&category_pk=${params.pk}&status=1&page=${num}&page_cut=10`);
        window.scrollTo(0, 0);
        setPosts(response.data.data);
        setPageList(range(1, response?.data?.maxPage));
    }
    return (
        <>
            <Wrappers>
                <Title>{state}</Title>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {posts && posts.map((item, idx) => (
                        <>
                            <ThemeCard item={item} category={'feature'} />
                        </>
                    ))}
                </div>
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
export default FeatureList;