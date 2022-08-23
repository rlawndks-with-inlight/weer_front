import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";
import SelectSubType from "../../components/elements/SelectSubType";
import SubType from "../../components/elements/SubType";
import { zColor, zChannel } from "../../data/TestData";
import logo from '../../assets/images/test/test_logo.png'
import { getIframeLinkByLink, shuffleArray } from '../../functions/utils';
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
    const [channelNum, setChannelNum] = useState(0)
    useEffect(() => {
        async function fetchPosts() {
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
                <SelectSubType className='subtype-container' style={{ top: '3rem', height: '4rem', alignItems: 'center' }}>
                    <SubType onClick={() => { setChannelNum(0) }} style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '2rem', height: '2rem', margin: '0.5rem', borderRadius: '50%', border: `1px solid ${zColor[0]}`, opacity: `${channelNum == 0 ? '1' : '0.4'}` }} />
                    {zChannel.map((item, index) => (
                        <>
                            <SubType onClick={() => { setChannelNum(index + 1) }} style={{ backgroundImage: `url(${item.image_src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '2rem', height: '2rem', margin: '0.5rem', borderRadius: '50%', opacity: `${index + 1 == channelNum ? '1' : '0.4'}` }} />
                        </>
                    ))}

                </SelectSubType>
                {posts.map((item, idx) => (
                    <>
                        <iframe style={{ width: '100%',  height: '60vw', maxHeight: '450px',marginTop:'12px' }} src={item.link ?? ""} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default VideoList;