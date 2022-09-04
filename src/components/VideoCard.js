import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import theme from "../styles/theme";
import { Card } from "./elements/UserContentTemplete";
import { AiFillHeart } from 'react-icons/ai'
export const Img = styled.img`
width: 90%;
height:280px;
background:#fff;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;
background-blend-mode: multiply;
@media screen and (max-width:1200px) {
    height: 28.266666666vw;
}
@media screen and (max-width:600px) {
    height: 58vw;
}
`
const VideoCard = (props) => {
    const {paddingBottom, item, isSlide, background, color, isImgPadding } = props;
    const navigate = useNavigate();
    return (
        <>
            <Card onClick={() => { navigate(`/video/${props.item.pk}`) }} style={{ background: `${props?.item?.background_color ? props?.item?.background_color : ''}`, color: `${props?.item?.font_color ? props?.item?.font_color : ''}`,paddingTop:`${isImgPadding?'0.5%':'0'}` }}>
                <Img src={`https://img.youtube.com/vi/${props.item.link}/0.jpg`}  style={{width:`${isImgPadding?'90%':'100%'}`,margin:`${isImgPadding?'5%':'0'}`}}  />
                {/* <iframe style={{ width: '100%', height: 'auto', height: '80vw', maxHeight: '450px' }} src={`https://www.youtube.com/embed/${videos.link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <div style={{ padding: '16px', minHeight: '50px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: `${props.isSlide ? '120px' : ''}` }}>
                    <div style={{ fontSize: `${theme.size.font3}` }}>{props?.item?.title}</div>
                    {props.isVideoList ?
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}><AiFillHeart style={{ fontSize: '18px', color: `${theme.color.font3}` }} /><p style={{ margin: '0', marginLeft: '6px' }}>{'2'}</p></div>
                                <img src={backUrl + props.channelImg} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                            </div>
                        </>
                        :
                        <>
                            <div style={{ fontSize: `${theme.size.font5}`, padding: '16px 0 32px 0', textAlign: 'center' }}>{"자세히보기 >"}</div>
                        </>
                    }
                    {props.isSlide ?
                        <>
                        </>
                        :
                        <>
                        </>
                    }
                </div>
            </Card>
        </>
    )
}
export default VideoCard;