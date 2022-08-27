import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Wrappers, Card, Img } from "../../components/elements/UserContentTemplete";
import SelectSubType from "../../components/elements/SelectSubType";
import SubType from "../../components/elements/SubType";
import logo from '../../assets/images/test/logo.svg'
import { getIframeLinkByLink, shuffleArray } from '../../functions/utils';
import theme from "../../styles/theme";
import { backUrl } from "../../data/Data";
import VideoCard from "../../components/VideoCard";

const VideoList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [channels, setChannels] = useState([])
    const [channelNum, setChannelNum] = useState(0)
    useEffect(() => {
        async function fetchPosts() {
            const { data: response0 } = await axios.get('/api/items?table=user&level=30')
            setChannels(response0.data);
            const { data: response } = await axios.get('/api/items?table=video&status=1');
            let list = response.data;
            for (var i = 0; i < list.length; i++) {
                list[i].link = getIframeLinkByLink(list[i].link);
            }
            setPosts(list)
        }
        fetchPosts();
    }, [])
    const getVideoListByNum = async (num, pk) => {
        setChannelNum(num);
        let str = '/api/items?table=video&status=1';
        if (num > 0) {
            str += `&user_pk=${pk}`
        }
        const { data: response } = await axios.get(str);
        let list = response.data;
        for (var i = 0; i < list.length; i++) {
            list[i].link = getIframeLinkByLink(list[i].link);
        }
        setPosts(list)
    }
    return (
        <>
            <Wrappers>
                <Title></Title>
                <SelectSubType className='subtype-container' style={{ top: '3rem', height: '4rem', alignItems: 'center', marginBottom: '16px' }}>
                    <SubType onClick={() => { getVideoListByNum(0, 0) }} style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '2rem', height: '2rem', margin: '0.5rem', borderRadius: '50%', border: `1px solid ${theme.color.background1}`, opacity: `${channelNum == 0 ? '1' : '0.4'}` }} />
                    {channels.map((item, index) => (
                        <>
                            <SubType onClick={() => { getVideoListByNum(index + 1, item.pk) }} style={{ backgroundImage: `url(${backUrl + item.profile_img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width: '2rem', height: '2rem', margin: '0.5rem', borderRadius: '50%', border: `1px solid ${theme.color.background1}`, opacity: `${index + 1 == channelNum ? '1' : '0.4'}` }} >
                            </SubType>
                        </>
                    ))}

                </SelectSubType>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {posts.map((item, idx) => (
                        <>
                            <VideoCard item={item} />

                        </>
                    ))}
                </div>
            </Wrappers>
        </>
    )
}
export default VideoList;