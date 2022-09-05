import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";

const Card = styled.div`
width:100%;
background:${props=>props.theme.color.background3};
text-align:center;
padding: 36px 0;
margin:6px 0;
color:${props=>props.theme.color.font2};
font-weight:bold;
font-size:${props=>props.theme.size.font2};
cursor:pointer;
`
const SelectFeatureCategory = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function fetchPosts(){
            const {data:response} = await axios.get('/api/items?table=feature_category');
            setPosts(response.data);
        }
        fetchPosts();
    },[])
    return (
        <>
            <Wrappers>
                {posts.map((item, idx)=>(
                    <>
                    <Card onClick={()=>{navigate(`/featurelist/${item.pk}`,{state:item.title})}}>
                        {item.title}
                    </Card>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default SelectFeatureCategory;