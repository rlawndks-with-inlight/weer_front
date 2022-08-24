import { useNavigate } from "react-router-dom";
import { backUrl } from "../data/Data";
import theme from "../styles/theme";

const ThemeCard = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: 'flex', width: '100%', marginBottom: '24px', minHeight: '100px', height: '35vw', maxHeight: '200px' }} onClick={()=>navigate(`/post/${props.category}/${props.item?.pk}`)}>
                <img src={backUrl+props.item?.main_img??""} style={{ width: '37.5%' }} />

                <div style={{ width: 'auto', padding: '16px', background: `${theme.color.background3}`, display: 'flex', flexDirection: 'column', width: '62.5%', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: `${theme.size.font4}`, fontWeight: 'bold' }}> {props.item?.title??""}</div>
                    <div style={{ fontSize: `${theme.size.font5}`, display: 'flex', flexWrap: 'wrap' }}>
                        {props.item?.hash}
                    </div>
                    <div style={{ fontSize: `${theme.size.font5}` }}>{props.item?.date??""}</div>
                </div>
            </div>
        </>
    )
}
export default ThemeCard;