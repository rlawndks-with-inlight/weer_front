import { useEffect, useState } from "react";
import styled from "styled-components";
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo } from './elements/AuthContentTemplete';
import { Title } from "./elements/UserContentTemplete";
import theme from "../styles/theme";
import $ from 'jquery';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../functions/utils";

const SelectType = styled.div`
display:flex;
width:100%;
z-index:5;
background:#fff;
margin: 16px 0;
`
const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
@media screen and (max-width:700px) {
    font-size:0.8rem;
}
`
const EditMyInfoCard = () => {
    const navigate = useNavigate();
    const [typeNum, setTypeNum] = useState(1);

    const [myPk, setMyPk] = useState(0);
    const [myId, setMyId] = useState("");
    const [phoneCheckIng, setPhoneCheckIng] = useState(false);
    const [isCheckId, setIsCheckId] = useState(false);
    const [isCheckNickname, setIsCheckNickname] = useState(false);
    const [isCheckPhoneNumber, setIsCheckPhoneNumber] = useState(false)
    const [isCheckIdAndPhone, setIsCheckIdAndPhone] = useState(false)
    const [randNum, setRandNum] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [num, setNum] = useState("");
    const [isCoinside, setIsCoinside] = useState(false);
    const [isSendSms, setIsSendSms] = useState(false)
    const [fixPhoneNumber, setFixPhoneNumber] = useState("")

    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem('auth'))
        setMyId(auth.id);
    }, [])
    const sendSms = async () => {
        if (typeNum == 2 && !$('.id').val()) {
            alert("아이디를 입력해 주세요.")
            return;
        }
        if (!$('.phone').val()) {
            alert("핸드폰 번호를 입력해주세요.")
            return;
        }
        setIsCheckPhoneNumber(false);
        let fix_phone = $('.phone').val().replace('-', '');
        setFixPhoneNumber(fix_phone);
        let content = "";
        for (var i = 0; i < 6; i++) {
            content += Math.floor(Math.random() * 10).toString();
        }

        let string = `\n인증번호를 입력해주세요 ${content}.\n\n-We are-`;
        try {
            const { data: response } = await axios.post(`/api/sendsms`, {
                receiver: [fix_phone, formatPhoneNumber(fix_phone)],
                content: string
            })
            if (response?.result > 0) {
                alert('인증번호가 발송되었습니다.');

                setIsSendSms(true)
                setRandNum(content);
                $('phone-check').focus();
            } else {
                setIsSendSms(false)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const refresh = () => {

    }
    const onChangeTypeNum = (num) => {
        if (num != typeNum) {
            $('.id').val('');
            $('.phone').val('');
            $('.phone-check').val('');
            $('.nickname').val('');
            $('.new-pw').val('');
            $('.new-pw-check').val('');
            setTypeNum(num);
        }
    }
    const onSave = async (num) => {
        let str = '/api/editmyinfo';
        if (!$('.pw').val()) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        let obj = { id: myId, pw: $('.pw').val() };
        if (num == 1) {
            if (!$('.nickname').val()) {
                alert("닉네임을 입력해주세요.");
                return;
            }
            obj.nickname = $('.nickname').val();
        } else if (num == 2) {
            if ($('.new-pw').val() != $('.new-pw-check').val()) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }
            obj.newPw = $('.new-pw').val();
        } else if (num == 3) {
            if (!randNum) {
                alert("인증번호를 발송해 주세요.");
                return;
            }
            if ($('.phone-check').val() != randNum) {
                alert("인증번호가 일치하지 않습니다.");
                return;
            }
            obj.phone = $('.phone').val();
        }
        const { data: response } = await axios.post(str, obj);
        console.log(response);
        if (response.result > 0) {
            alert("성공적으로 저장되었습니다.\n다시 로그인 해주세요.");
            const { data: response } = await axios.post('/api/logout');
            navigate('/login');
        } else {
            alert(response.message);
        }
    }
    return (
        <>
            <WrapperForm>
                <Title>마이페이지 수정</Title>
                <SelectType>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { onChangeTypeNum(1) }}>닉네임 변경</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { onChangeTypeNum(2) }}>비밀번호 변경</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 3 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 3 ? theme.color.background1 : '#ccc'}` }} onClick={() => { onChangeTypeNum(3) }}>전화번호 변경</Type>
                </SelectType>
                {typeNum == 1 ?
                    <>
                        <CategoryName>비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.nickname').focus() : null} />
                        <CategoryName>변경할 닉네임</CategoryName>
                        <Input className="nickname" placeholder="변경할 닉네임을 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>
                }
                {typeNum == 2 ?
                    <>
                        <CategoryName>현재 비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="현재 비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.new-pw').focus() : null} />
                        <CategoryName>새 비밀번호</CategoryName>
                        <Input className="new-pw" type={'password'} placeholder="새 비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.new-pw-check').focus() : null} />
                        <CategoryName>새 비밀번호 확인</CategoryName>
                        <Input className="new-pw-check" type={'password'} placeholder="비밀번호를 한번 더 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>
                }
                {typeNum == 3 ?
                    <>
                        <CategoryName>비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.phone').focus() : null} />
                        <CategoryName>전화번호</CategoryName>
                        <Input className="phone" placeholder="전화번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? sendSms() : null} />
                        <Button onClick={sendSms}>인증번호 발송</Button>
                        <CategoryName>인증번호</CategoryName>
                        <Input className="phone-check" placeholder="인증번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>
                }
                <Button style={{ marginTop: '36px' }} onClick={() => onSave(typeNum)}>저장</Button>
            </WrapperForm>
        </>
    )
}
export default EditMyInfoCard;