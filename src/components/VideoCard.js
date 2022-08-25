import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import theme from "../styles/theme";
import { Card, Img } from "./elements/UserContentTemplete";
const VideoCard = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <Card onClick={() => { navigate(`/video/${props.item.pk}`) }}>
                <Img src={`https://img.youtube.com/vi/${props.item.link}/mqdefault.jpg`} />
                {/* <iframe style={{ width: '100%', height: 'auto', height: '80vw', maxHeight: '450px' }} src={`https://www.youtube.com/embed/${videos.link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ padding: '6px 0' }}>{props.item.title}</div>
                    <div style={{ padding: '6px 0', fontSize: `${theme.size.font5}` }}>자세히보기 {'>'}</div>
                </div>
            </Card>
        </>
    )
}
export default VideoCard;