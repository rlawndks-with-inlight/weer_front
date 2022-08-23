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
import { Card, Title, Input, Select, Row, Col, ImageContainer } from '../../components/elements/ManagerTemplete';
import { backUrl } from '../../data/Data';


const MMasterEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    useEffect(() => {
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=user&pk=${params.pk}`)
                $('.id').val(response.data.id)
                $('.pw').val("")
                $('.name').val(response.data.name)
                $('.nickname').val(response.data.nickname)
                setUrl(backUrl + response.data.profile_img)
            }
        }
        fetchPost();
    }, [])
    const editMaster = async () => {
        if ((!$(`.id`).val() || !$(`.name`).val() || !$(`.pw`).val() || !content) && params.pk == 0) {
            alert('필요값이 비어있습니다.');
        } else {

            formData.append("id", $(`.id`).val());
            formData.append("pw", $(`.pw`).val());
            formData.append("name", $(`.name`).val());
            formData.append("nickname", $(`.nickname`).val());
            formData.append("user_level", 30);
            formData.append("master", content);
            if (params.pk > 0) formData.append("pk", params.pk)
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                if (params.pk <= 0) {
                    const { data: response } = await axios.post('/api/addmaster', formData);
                    alert(response.message);
                    if (response.result > 0) {
                        navigate('/manager/list/master');
                    }

                } else {
                    const { data: response } = await axios.post('/api/updatemaster', formData);
                    if (response.result > 0) {
                        navigate('/manager/list/master');
                    }
                }
            }
        }


    }
    const addFile = (e) => {
        if (e.target.files[0]) {
            setContent(e.target.files[0]);
            setUrl(URL.createObjectURL(e.target.files[0]))
        }
    };
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={params.pk == 0 ? '전문가 추가' : '전문가 수정'} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>아이디</Title>
                                <Input className='id' />
                            </Col>
                            <Col>
                                <Title>비밀번호</Title>
                                <Input className='pw' type={'password'} />
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Title>이름</Title>
                                <Input className='name' />
                            </Col>
                            <Col>
                                <Title>닉네임</Title>
                                <Input className='nickname' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>프로필 이미지</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: '200px', height: '150px',
                                                    margin: '24px'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: '#009432' }} />
                                        </>}
                                </ImageContainer>
                                <div>
                                    <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                                </div>
                            </Col>
                        </Row>

                    </Card>
                    <ButtonContainer>
                        <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                        <AddButton onClick={editMaster}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MMasterEdit;