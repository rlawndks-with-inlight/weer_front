import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import { AiFillFileImage } from 'react-icons/ai'
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import CancelButton from '../../components/elements/button/CancelButton';
import $ from 'jquery';
import { addItem, updateItem } from '../../functions/utils';
const Card = styled.div`
background:#fff;
display:flex;
flex-direction:column;
width:95%;
margin:12px auto;
box-shadow:0px 0px 16px #dddddd;
border-radius:24px;
padding: 24px 0;
min-height:640px;
`
const Title = styled.div`
margin:12px auto 6px 24px;
width:90%;
color:#009432;
font-weight:bold;
`
const Input = styled.input`
margin:12px auto 6px 24px;
width:200px;
padding:8px;
outline:none;
`

const Select = styled.select`
margin:12px auto 6px 24px;
width:218px;
padding:8px;
outline:none;
`
const MIssueCategoryEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")

    useEffect(() => {

        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=issue_category&pk=${params.pk}`)
                $('.title').val(response.data.title)
            }
        }
        fetchPost();
    }, [])
    const editUser = async () => {
        if (!$(`.title`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                title: $(`.title`).val(),
            }
            if (params.pk > 0) obj.pk = params.pk;
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                if (params.pk > 0) {
                    const { data: response } = await axios.post('/api/updateissuecategory', obj);
                    if (response.result > 0) {
                        alert('성공적으로 수정되었습니다.');
                        navigate(-1);
                    }
                } else {
                    const { data: response } = await axios.post('/api/addissuecategory', obj);
                    if (response.result > 0) {
                        alert('성공적으로 추가되었습니다.');
                        navigate(-1);
                    }
                }
            }
        }


    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '핵심이슈&공시 카테고리 추가' : '핵심이슈&공시 카테고리 수정'} nickname={myNick} />
                    <Card>
                        <Title style={{ margintop: '32px' }}>제목</Title>
                        <Input className='title' />
                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                        <AddButton onClick={editUser}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MIssueCategoryEdit;