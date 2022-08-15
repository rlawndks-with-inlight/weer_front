import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import '../../../styles/style.css'
import { Wrappers } from '../../../components/elements/Wrappers';
import TalkContent from '../../../components/TalkContent';
import { ContentWrappers } from '../../../components/elements/ContentWrappers';
import { zTalk } from '../../../data/TestData';
import { shuffleArray } from '../../../functions/utils';
const TalkList = () => {
    const [posts, setPosts] = useState([])
    useState(()=>{
        setPosts(shuffleArray(zTalk))
    },[])
    return (
        <>
            <Wrappers>
                <ContentWrappers style={{ marginTop: '-7px',paddingBottom:'3rem' }}>
                    {posts.map((item, index) => (
                        <>
                            <TalkContent item={item} />
                        </>
                    ))}
                </ContentWrappers>
            </Wrappers>
        </>
    )
}
export default TalkList;