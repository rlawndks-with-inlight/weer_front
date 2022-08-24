import { useEffect, useState } from "react";
import { Wrappers } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { getIframeLinkByLink } from "../../../functions/utils";
import { backUrl } from "../../../data/Data";

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
`
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
const Master = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(1)
    const [subTypeNum, setSubTypeNum] = useState(0)

    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get(`/api/items?table=strategy&user_pk=${params.pk}`);
            setPosts(response.data)
            console.log(response);
        }
        fetchPosts();
    }, [])

    const changeType = async (num) => {
        setTypeNum(num);
        let str = "";
        if (num == 1) {
            str = `/api/items?table=strategy&user_pk=${params.pk}`
            const { data: response } = await axios.get(str);
            console.log(response)
            setPosts(response.data);
        } else {
            str = `/api/items?table=video&user_pk=${params.pk}`
            const { data: response } = await axios.get(str);
            let list = response.data;
            for (var i = 0; i < list.length; i++) {
                list[i].link = getIframeLinkByLink(list[i].link);
            }
            setPosts(list);
        }
    }
    return (
        <>
            <Wrappers>
                <Card onClick={() => {}}>
                    <div style={{ width: '50%', padding: '20px' }}>
                        <div>{state.nickname}</div>
                        <div style={{ fontSize: `${theme.size.font5}`, marginTop: '8px', color: `${theme.color.font2}` }}>{state.name} 전문가</div>
                    </div>
                    <img style={{ position: 'absolute', bottom: '0', right: '5%', height: '80%' }} src={backUrl + state.img} />
                </Card>
                <SelectType>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1) }}>투자전략</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2) }}>핵심비디오</Type>
                </SelectType>
                {posts.map((item, idx) => (
                    <>
                        {typeNum == 1 ?
                            <>
                                <ThemeCard item={item} category={'strategy'} />
                            </>
                            :
                            <>
                                <div style={{ width: '100%', background: `${theme.color.background3}`, fontSize: `${theme.size.font4}` }} onClick={() => { navigate(`/video/${item.pk}`) }}>
                                    <img src={`https://img.youtube.com/vi/${item?.link}/mqdefault.jpg`} style={{ width: '100%' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <div style={{ padding: '6px 0' }}>{item.title}</div>
                                        <div style={{ padding: '6px 0', fontSize: `${theme.size.font5}` }}>자세히보기 {'>'}</div>
                                    </div>
                                </div>
                            </>
                        }
                    </>
                ))}

            </Wrappers>
        </>
    )
}
export default Master;