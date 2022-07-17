import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import '../../styles/style.css'
import { Wrappers } from '../../components/elements/Wrappers';
import { zVideo,zChannel, zColor } from '../../data/TestData';
import VideoContent from '../../components/VideoContent';
import SelectSubType from '../../components/elements/SelectSubType';
import SubType from '../../components/elements/SubType';
import { ContentWrappers } from '../../components/elements/ContentWrappers';
import logo from '../../assets/images/test/test_logo.png'
import { shuffleArray } from '../../functions/utils';
const VideoList = () => {
    const [channelNum, setChannelNum] = useState(0)
    const [posts, setPosts] = useState([])
    useState(()=>{
        setPosts(shuffleArray(zVideo))
    },[])
    return (
        <>
        <Wrappers>
                <SelectSubType className='subtype-container' style={{top:'3rem',height:'4rem',alignItems:'center'}}>
                    <SubType onClick={() => { setChannelNum(0) }} style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center',width:'2rem',height:'2rem',margin:'0.5rem',borderRadius:'50%',border:`1px solid ${zColor[0]}`,opacity:`${channelNum==0?'1':'0.4'}`}} />
                    {zChannel.map((item, index) => (
                        <>
                            <SubType onClick={() => { setChannelNum(index+1) }} style={{ backgroundImage: `url(${item.image_src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center',width:'2rem',height:'2rem',margin:'0.5rem',borderRadius:'50%',opacity:`${index+1==channelNum?'1':'0.4'}`}}/>
                        </>
                    ))}
                </SelectSubType>
                <ContentWrappers style={{marginTop:'3rem',paddingBottom:'3rem'}}>
                    {posts.map((item,index)=>(
                        <>
                        <VideoContent item={item} />
                        </>
                    ))}
                </ContentWrappers>
            </Wrappers>
        </>
    )
}
export default VideoList;