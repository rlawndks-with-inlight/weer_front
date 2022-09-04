import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import logo from '../assets/images/test/logo.svg'
import kakao from '../assets/images/icon/kakao.png'
import naver from '../assets/images/icon/naver.png'
import { Title } from './elements/UserContentTemplete';

const WrapperForm = styled.div`
width:90%;
background:#fff;
max-width:450px;
margin: 0 auto;
display:flex;
flex-direction:column;
`

const CategoryName = styled.div`
width:364px;
margin:1rem auto 0 auto;
font-size:15px;
color:${(props) => props.theme.color.manager.font1};
font-weight:500;
@media (max-width: 600px) {
    width:85%;
}
`
const Input = styled.input`
width:336px;
padding:16px 12px;
border:1px solid #cccccc;
margin:1rem auto 0 auto;
outline:none;
font-size:12px;
::placeholder {
    color:#dddddd;
    font-size:12px;
}
@media (max-width: 600px) {
    width:75%;
}
`
const Button = styled.button`
width:364px;
margin:0 auto;
height:48px;
border:none;
background:${(props) => props.theme.color.background1};
color:#fff;
font-size:16px;
font-weight:600;
cursor:pointer;
border: 1px solid transparent;
margin:3rem auto 0 auto;
@media (max-width: 800px) {
    ;
}
@media (max-width: 550px) {
    width:81%;
}
@media (max-width: 450px) {
    width:83%;
}
`
const FlexBox = styled.div`
width:364px;
margin:1rem auto;
display:flex;
align-items:center;
font-weight:600;
@media (max-width: 600px) {
    width:85%;
}
`
const SnsLogo = styled.img`
width:42px;
margin-right:16px;
`
const SignUpCard = () => {
    const navigate = useNavigate();
    const [phoneCheckIng, setPhoneCheckIng] = useState(false);
    const [isCheckId, setIsCheckId] = useState(false);
    const onCheckId = () =>{

    }
    const onSignUp = async () => {

    }
    return (
        <>
            <WrapperForm onSubmit={onSignUp} id='login_form'>
                <Title>회원가입</Title>
                <CategoryName style={{ marginTop: '36px' }}>아이디</CategoryName>
                <Input placeholder='아이디를 입력해주세요.' type={'text'} className='id' />
                <Button style={{marginTop:'0'}}>중복확인</Button>
                <CategoryName>비밀번호</CategoryName>
                <Input placeholder='비밀번호를 입력해주세요.' type={'password'} className='pw' />
                <CategoryName>비밀번호 확인</CategoryName>
                <Input placeholder='비밀번호를 한번더 입력해주세요.' type={'password'} className='pw-check' />
                <CategoryName style={{ marginTop: '36px' }}>이름</CategoryName>
                <Input placeholder='이름을 입력해주세요.' type={'text'} className='name' />
                <CategoryName style={{ marginTop: '36px' }}>닉네임</CategoryName>
                <Input placeholder='닉네임을 입력해주세요.' type={'text'} className='nickname' />
                <CategoryName style={{ marginTop: '36px' }}>전화번호</CategoryName>
                <Input placeholder='전화번호를 입력해주세요.' type={'text'} className='phone' />
                {phoneCheckIng ?
                    <>
                        <CategoryName style={{ marginTop: '36px' }}>인증번호</CategoryName>
                        <Input placeholder='인증번호를 입력해주세요.' type={'text'} className='phone-check' />
                    </>
                    :
                    <>
                    </>
                }


                <Button onClick={onSignUp}>회원가입</Button>
                <CategoryName style={{ marginTop: '36px' }}>SNS 간편 회원가입</CategoryName>
                <FlexBox>
                    <SnsLogo src={kakao} />
                    <SnsLogo src={naver} />
                </FlexBox>
               
            </WrapperForm>
        </>
    );
};
export default SignUpCard