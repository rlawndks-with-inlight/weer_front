import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { Wrappers } from '../../components/elements/Wrappers';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/style.css'
import { zTheme, zLetter, zColor } from '../../data/TestData';
import { ContentWrappers } from '../../components/elements/ContentWrappers';
import LetterContent from '../../components/LetterContent';
import SelectSubType from '../../components/elements/SelectSubType';
import SubType from '../../components/elements/SubType';
import { shuffleArray } from '../../functions/utils';
const SelectType = styled.div`
position:fixed;
top:3rem;
display:flex;
width:100%;
max-width:700px;
z-index:5;
background:#fff;
`
const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
`


const LetterList = () => {
    const params = useParams();
    const history = useHistory();

    const [modal, setModal] = useState("none");
    const [side, setSide] = useState("none")
    const [typeNum, setTypeNum] = useState(1)
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [posts, setPosts] = useState([])
    useState(()=>{
        setPosts(shuffleArray(zLetter))
    },[])


    let settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    function getType(num) {
        if (num == 1) {
            return '날짜별'
        } else if (num == 2) {
            return '주제별'
        }
    }
    function getSubType(num){
        if(num==0){
            return '경제'
        } else if (num==1){
            return '재테크'
        }else if (num==2){
            return '이슈'
        }else if (num==3){
            return '트렌드'
        }else if (num==4){
            return 'IT'
        }else if (num==5){
            return '글로벌'
        }else if (num==6){
            return '환경'
        }else if (num==7){
            return '스페셜'
        }
    }
    return (
        <>
            <Wrappers>
                <SelectType>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? zColor[0] : '#fff'}`, color: `${typeNum == 1 ? zColor[0] : '#ccc'}` }} onClick={() => { setTypeNum(1);setPosts(shuffleArray(zLetter)); }}>날짜별</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? zColor[0] : '#fff'}`, color: `${typeNum == 2 ? zColor[0] : '#ccc'}` }} onClick={() => { setTypeNum(2);setPosts(shuffleArray(zLetter)); }}>주제별</Type>
                </SelectType>
                {typeNum == 1 ?
                    <>
                        <SelectSubType style={{top:'5.9rem'}}>

                        </SelectSubType>
                    </>
                    :
                    <>
                        <SelectSubType className='subtype-container'style={{top:'5.9rem'}}>
                            {zTheme.map((item, index)=>(
                                <>
                                <SubType style={{color:`${index==subTypeNum?zColor[0]:'#ccc'}`,fontWeight:`${index==subTypeNum?'bold':'100'}`}} onClick={()=>{setSubTypeNum(index)}}>
                                    {item}
                                </SubType>
                                </>
                            ))}
                        </SelectSubType>
                    </>
                }
                <ContentWrappers style={{marginTop:`${typeNum==1?'2rem':'4.3rem'}`,paddingBottom:'2rem'}}>
                    {posts.map((item,index)=>(
                        <>
                        <LetterContent item={item} />
                        </>
                    ))}
                </ContentWrappers>
            </Wrappers>
        </>
    );
};
export default LetterList;