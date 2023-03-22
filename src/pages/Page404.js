import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Wrappers } from "../components/elements/UserContentTemplete";
import styled from "styled-components";
import { MdOutlineCancel } from 'react-icons/md'
import theme from "../styles/theme";
import { frontUrl } from "../data/Data";
const RowContent = styled.div`
display:flex;
width:100%;
margin:24px 0;
@media screen and (max-width:700px) { 
}
`
const Page404 = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [posts, setPosts] = useState({});
    return (
        <>
            <Wrappers>
                    <div style={{ margin: 'auto auto 8px auto' }}>없는 페이지 입니다.</div>
                    <div style={{ margin: '8px auto 8px auto' }}>{frontUrl}{pathname}</div>
                    <MdOutlineCancel style={{ margin: '8px auto auto auto', fontSize: '54px' }} />
            </Wrappers>
        </>
    )
}
export default Page404;