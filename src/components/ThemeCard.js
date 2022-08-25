import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import theme from "../styles/theme";

const Card = styled.div`
width: 48%; 
display: flex;
margin-bottom: 16px;
height: 240px;
background: ${theme.color.background3};
@media screen and (max-width:1000px) {
    height: 24vw;
}
@media screen and (max-width:700px) {
    width: 100%; 
    height: 45vw;
}
`
const Img = styled.div`
width: 200px;
background:#fff;
@media screen and (max-width:1000px) {
    width:20vw;
}
@media screen and (max-width:700px) {
    width:37.5vw;
}
`
const ThemeCard = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <Card onClick={() => navigate(`/post/${props.category}/${props.item?.pk}`)}>
                <Img style={{
                    backgroundImage: `url(${backUrl + props.item?.main_img ?? ""})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundBlendMode: 'multiply'
                }} />

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: `${theme.size.font4}`, fontWeight: 'bold' }}> {props.item?.title ?? ""}</div>
                    <div style={{ fontSize: `${theme.size.font5}`, display: 'flex', flexWrap: 'wrap' }}>
                        {props.item?.hash}
                    </div>
                    <div style={{ fontSize: `${theme.size.font5}` }}>{props.item?.date ?? ""}</div>
                </div>
            </Card>
        </>
    )
}
export default ThemeCard;