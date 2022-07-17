import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import '../../styles/style.css'
import { Wrappers } from '../../components/elements/Wrappers';
import { zTheme, zCard, zColor } from '../../data/TestData';
import SelectSubType from '../../components/elements/SelectSubType';
import SubType from '../../components/elements/SubType';
import { ContentWrappers } from '../../components/elements/ContentWrappers';
import CardContent from '../../components/CardContent';
import { shuffleArray } from '../../functions/utils';
const CardList = () => {

    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([])
    useState(()=>{
        setPosts(shuffleArray(zCard))
    },[])
    return (
        <>
            <Wrappers>
                <SelectSubType className='subtype-container' style={{top:'3rem'}}>
                    {zTheme.map((item, index) => (
                        <>
                            <SubType style={{ color: `${index == subTypeNum ? zColor[0] : '#ccc'}`, fontWeight: `${index == subTypeNum ? 'bold' : '100'}` }} onClick={() => { setSubTypeNum(index) }}>
                                {item}
                            </SubType>
                        </>
                    ))}
                </SelectSubType>
                <ContentWrappers style={{marginTop:'1rem',paddingBottom:'2rem'}}>
                    {posts.map((item,index)=>(
                        <>
                        <CardContent item={item} />
                        </>
                    ))}
                </ContentWrappers>
            </Wrappers>
        </>
    )
}
export default CardList;