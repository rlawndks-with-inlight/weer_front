import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";
import LeftImgCard from "../../components/LeftImgCard";
import ThemeCard from "../../components/ThemeCard";
import { backUrl } from "../../data/Data";
import theme from "../../styles/theme";

const Card = styled.div`
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
const ThemeList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/items?table=theme');
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                <Title>핵심 테마</Title>
                {posts.map((item, idx) => (
                    <>
                        <ThemeCard item={item} category={'theme'}/>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default ThemeList;