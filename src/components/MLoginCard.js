import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
const WrapperForm = styled.div`
width:90%;
background:#fff;
max-width:500px;
height:500px;
margin:120px auto 0 auto;
border-radius:24px;
box-shadow:0px 0px 8px #cccccc;
display:flex;
flex-direction:column;
`
const Title = styled.div`
color:${(props) => props.theme.color.background1};
font-size:36px;
width:100%;
text-align:center;
margin:2.5rem 0;
font-weight:bold;

`
const CategoryName = styled.div`
width:360px;
margin:1rem auto 0 auto;
font-size:20px;
color:${(props) => props.theme.color.background1};
font-weight:bold;
@media (max-width: 600px) {
    width:80%;
}
`
const Input = styled.input`
width:336px;
padding:12px;
border-top:0;
border-left:0;
border-right:0;
border-bottom:1px soild #cccccc;
margin:1rem auto 0 auto;
outline:none;
font-size:18px;
::placeholder {
    color:#dddddd;
}
@media (max-width: 600px) {
    width:75%;
}
`
const Button = styled.button`
width:360px;
margin:2.5rem auto;
height:54px;
border:none;
background:${(props) => props.theme.color.background1};
color:#fff;
font-size:24px;
cursor:pointer;
@media (max-width: 600px) {
width:80%;
}
`
const MLoginCard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function isAdmin() {
            const { data: response } = await axios.get('/api/auth', {
                headers: {
                    'Content-type': 'application/json',
                }
            },
                { withCredentials: true });
            if (response.level >= 30) {
                localStorage.setItem('auth', JSON.stringify(response))
                navigate('/manager/userlist');
            } else {
                localStorage.removeItem('auth')
            }
        }
        isAdmin();

        $("#login_form").keypress(function (e) {
            if (e.keyCode === 13) {
                onLogin();
            }
        });
    }, [])
    const onLogin = async () => {
        const { data: response } = await axios.post('/api/loginbyid', {
            id: $('.id').val(),
            pw: $('.pw').val()
        })
        alert(response.message);
        if (response.result > 0) {
            localStorage.setItem('auth',JSON.stringify(response.data))
            navigate('/manager/userlist');
        }
    }
    return (
        <>
            <WrapperForm onSubmit={onLogin} id='login_form'>
                <Title>We'er</Title>
                <CategoryName>ID</CategoryName>
                <Input placeholder='input id' type={'text'} className='id' />
                <CategoryName>PW</CategoryName>
                <Input placeholder='input password' type={'password'} className='pw' />
                <Button onClick={onLogin}>Login</Button>
            </WrapperForm>
        </>
    );
};
export default MLoginCard