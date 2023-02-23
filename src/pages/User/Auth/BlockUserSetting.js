import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Title, Wrappers } from "../../../components/elements/UserContentTemplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgToggleOn, CgToggleOff } from 'react-icons/cg'
import theme from "../../../styles/theme";
import { AiFillDelete } from "react-icons/ai";
const Content = styled.div`
width:100%;
display:flex;
justify-content:space-between;
padding: 16px 0;
border-bottom: 1px solid #cccccc;
align-items:center;
padding: 14px 0;
`

const BlockUserSetting = () => {
    const navigate = useNavigate();
    const [wantAlarm, setWantAlarm] = useState(1)
    const [isWebView, setIsWebView] = useState(false)
    const [wantDark, setWantDark] = useState(false)
    const [hateList, setHateList] = useState([])
    useEffect(() => {
        getblockUsers();
    }, [])
    const getblockUsers = async () => {
        const { data: response } = await axios.get('/api/gethatelist');
        setHateList(response?.data);
    }
    const deleteBlockUser = async (item) => {
        if (window.confirm(`${item?.nickname} 유저 차단을 취소 하시겠습니까?`)) {
            const { data: response } = await axios.post('/api/deletehate', {
                pk: item?.pk
            })
            if (response?.result < 0) {
                alert(response?.message);
            } else {
                alert('차단 해제가 완료되었습니다.');
                getblockUsers();
            }
        }

    }
    return (
        <>
            <Wrappers className="wrapper" style={{ maxWidth: '800px' }}>
                <Title>차단자설정</Title>
                {hateList && hateList.map((item, idx) => (
                    <>
                        <Content>
                            <div>{item?.nickname}</div>
                            <AiFillDelete style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteBlockUser(item)} />
                        </Content>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default BlockUserSetting;