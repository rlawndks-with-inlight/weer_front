import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgToggleOn, CgToggleOff } from 'react-icons/cg'
import theme from "../../styles/theme";
const Content = styled.div`
width:100%;
background:#fff;
display:flex;
justify-content:space-between;
padding: 16px 0;
border-bottom: 1px solid #cccccc;
align-items:center;
padding: 14px 0;
`

const AppSetting = () => {
    const navigate = useNavigate();
    const [wantAlarm, setWantAlarm] = useState(1)
    useEffect(() => {
        if (window && window.flutter_inappwebview) {
            window.flutter_inappwebview.callHandler('get_allow_alarm', {}).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                let obj = JSON.parse(result);
                setWantAlarm(obj.data?.is_want_alarm);
            });
        }else{
            navigate(-1);
        }
    }, [])
    const changeSetting = (num) => {
        setWantAlarm(num);
        if (window && window.flutter_inappwebview) {
            var params = { 'is_allow_alarm': num };
            window.flutter_inappwebview.callHandler('set_allow_alarm', JSON.stringify(params)).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
            });
        }
    }
    return (
        <>
            <Wrappers className="wrapper" style={{ maxWidth: '800px' }}>
                <Title>앱 설정</Title>
                <Content>
                    <div>푸시알림</div>
                    {wantAlarm == 1 ?
                        <CgToggleOn style={{ color: `${theme.color.background1}`, cursor: 'pointer', fontSize: '30px' }} onClick={()=>changeSetting(0)} /> :
                        <CgToggleOff style={{ color: '#aaaaaa', cursor: 'pointer', fontSize: '30px' }} onClick={()=>changeSetting(1)} />}

                </Content>

            </Wrappers>
        </>
    )
}
export default AppSetting;