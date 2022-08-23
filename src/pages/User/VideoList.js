import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";
import SelectSubType from "../../components/elements/SelectSubType";
import SubType from "../../components/elements/SubType";
import { zColor, zChannel } from "../../data/TestData";
import logo from '../../assets/images/test/logo.svg'
import { getIframeLinkByLink, shuffleArray } from '../../functions/utils';
import theme from "../../styles/theme";
import { backUrl } from "../../data/Data";
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
const VideoList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [channels, setChannels] = useState([])
    const [channelNum, setChannelNum] = useState(0)
    useEffect(() => {
        async function fetchPosts() {
            const {data:response0} = await axios.get('/api/items?table=user&level=30')
            setChannels(response0.data);
            const { data: response } = await axios.get('/api/items?table=video');
            let list = response.data;
            for (var i = 0; i < list.length; i++) {
                list[i].link = getIframeLinkByLink(list[i].link);
            }
            setPosts(list)
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                <Title>핵심 비디오</Title>
                <SelectSubType className='subtype-container' style={{ top: '3rem', height: '4rem', alignItems: 'center',marginBottom:'16px' }}>
                    <SubType onClick={() => { setChannelNum(0) }} style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '2rem', height: '2rem', margin: '0.5rem', borderRadius: '50%', border: `1px solid ${theme.color.background1}`, opacity: `${channelNum == 0 ? '1' : '0.4'}` }} />
                    {channels.map((item, index) => (
                        <>
                            <SubType onClick={() => { setChannelNum(index + 1) }} style={{ backgroundImage: `url(${backUrl+item.profile_img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '2rem', height: '2rem', margin: '0.5rem', borderRadius: '50%', opacity: `${index + 1 == channelNum ? '1' : '0.4'}` }} >
                            </SubType>
                        </>
                    ))}

                </SelectSubType>
                {posts.map((item, idx) => (
                    <>
                        <div style={{ width: '100%', background: `${theme.color.background3}`, fontSize: `${theme.size.font4}` }} onClick={() => { navigate(`/video/${item.pk}`) }}>
                            <img src={`https://img.youtube.com/vi/${item.link}/mqdefault.jpg`} style={{ width: '100%' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <div style={{ padding: '6px 0' }}>{item.title}</div>
                                <div style={{ padding: '6px 0', fontSize: `${theme.size.font5}` }}>자세히보기 {'>'}</div>
                            </div>
                        </div>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default VideoList;