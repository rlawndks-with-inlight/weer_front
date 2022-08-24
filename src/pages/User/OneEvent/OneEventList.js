import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers,Content } from "../../../components/elements/UserContentTemplete";
import LeftImgCard from "../../../components/LeftImgCard";
import ThemeCard from "../../../components/ThemeCard";
import { backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";


const OneEventList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/items?table=oneevent');
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                <Title>하루 1종목</Title>
                {posts.map((item, idx) => (
                    <Content onClick={() => { navigate(`/post/oneevent/${item?.pk}`) }}>
                        <div >{item?.title ?? ""}</div>
                        <div style={{ fontSize: `${theme.size.font4}`, padding: '6px 0 0 0' }}>{item?.hash ?? ""}</div>
                    </Content>
                ))}
            </Wrappers>
        </>
    )
}
export default OneEventList;