import React from 'react'
import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import $ from 'jquery';
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../components/elements/ManagerTemplete';
import { AiFillFileImage } from 'react-icons/ai'
import theme from '../../styles/theme';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { backUrl } from '../../data/Data';
import { objManagerListContent, cardDefaultColor } from '../../data/Data';
import Loading from '../../components/Loading';

const MItemEdit = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();

    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())

    const [noteFormData] = useState(new FormData());
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(false)
    const [zCategory, setZCategory] = useState([])
    const [fontColor, setFontColor] = useState(cardDefaultColor.font);
    const [backgroundColor, setBackgroundColor] = useState(cardDefaultColor.background)
    useEffect(() => {
        async function fetchPost() {
            if (params.table == 'issue') {
                const { data: response } = await axios.get('/api/items?table=issue_category');
                setZCategory(response.data)
            }

            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=${params.table}&pk=${params.pk}`);
                $(`.title`).val(response.data.title);
                $(`.hash`).val(response.data.hash);
                $(`.suggest-title`).val(response.data.suggest_title);
                $('.font-color').val(response.data.font_color)
                $('.background-color').val(response.data.background_color)
                if (params.table == 'issue') {
                    $(`.category`).val(response.data.category_pk);
                }
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
                setUrl(backUrl + response.data.main_img);
                setItem(response.data)
            } else {
                $('.font-color').val(cardDefaultColor.font)
                $('.background-color').val(cardDefaultColor.background)
                if (params.table == 'oneword' || params.table == 'oneevent') {
                    const { data: response } = await axios.get(`/api/${params.table}`)
                    if (response.data) {
                        $(`.title`).val(response.data.title);
                        $('.hash').val(response.data.hash);
                        $(`.suggest-title`).val(response.data.suggest_title);
                        editorRef.current?.getInstance().setHTML(response.data.note);
                        setUrl(backUrl + response.data.main_img);
                        setItem(response.data)
                    } else {
                        $(`.title`).val("");
                        $('.hash').val("");
                        $(`.suggest-title`).val("");
                        editorRef.current?.getInstance().setHTML("");
                        setUrl("");
                        setItem({ main_img: '' })
                    }

                } else {
                    $('.font-color').val(cardDefaultColor.font)
                    $('.background-color').val(cardDefaultColor.background)
                }
            }

        }
        fetchPost();
    }, [pathname])
    const editItem = async () => {
        if ((!content && !url) || !$(`.hash`).val() || !$(`.title`).val() || !$(`.suggest-title`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let auth = JSON.parse(localStorage.getItem('auth'))
            formData.append('table', params.table);
            formData.append('content', content);
            formData.append('url', item.main_img)
            formData.append('title', $(`.title`).val())
            formData.append('hash', $(`.hash`).val())
            formData.append('suggest_title', $(`.suggest-title`).val())
            if (params.table == 'issue') {
                formData.append('category', $(`.category`).val());
            }
            formData.append('user_pk', auth.pk ?? 0)
            formData.append('note', editorRef.current.getInstance().getHTML());

            if (params.table == 'issue') formData.append('category_pk', $('.category').val())
            if (params.pk > 0) formData.append('pk', params.pk);

            if (window.confirm(`저장하시겠습니까?`)) {
                if (params.table == 'oneword' || params.table == 'oneevent') {
                    const { data: response } = await axios.post(`/api/add${params.table}`, formData)
                    if (response.result > 0) {
                        alert('성공적으로 저장되었습니다.');
                        navigate(-1);
                    }
                } else {
                    formData.append('font_color',$('.font-color').val());
                    formData.append('background_color',$('.background-color').val())
                    if (params.pk > 0) {
                        const { data: response } = await axios.post(`/api/updateitem`, formData)
                        if (response.result > 0) {
                            alert('성공적으로 저장되었습니다.')
                            navigate(-1);
                        }
                    } else {
                        const { data: response } = await axios.post(`/api/additem`, formData)
                        if (response.result > 0) {
                            alert('성공적으로 추가 되었습니다.');
                            navigate(-1);
                        }

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
    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`${params.table}`].breadcrumb} nickname={myNick} />
                    <Card>

                        <Row>
                            <Col>
                                <Title>프로필 이미지</Title>
                                <ImageContainer for="file1">

                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: '8rem', height: '8rem',
                                                    margin: '2rem'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <AiFillFileImage style={{ margin: '4rem', fontSize: '4rem', color: `${theme.color.manager.font3}` }} />
                                        </>}
                                </ImageContainer>
                                <div>
                                    <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>추천 게시물 제목</Title>
                                <Input className='suggest-title' placeholder='[주식용어] 유상증자' />
                            </Col>
                            {params.table == 'issue' ?
                                <>
                                    <Col>
                                        <Title>카테고리</Title>
                                        <Select className='category'>
                                            {zCategory && zCategory.map((item, idx) => (
                                                <>
                                                    <option value={item.pk}>{item.title}</option>
                                                </>
                                            ))}
                                        </Select>
                                    </Col>
                                </>
                                :
                                <>
                                </>
                            }
                        </Row>
                        <Row>
                            <Col>
                                <Title>제목</Title>
                                <Input className='title' placeholder='[주식용어] 유상증자' />
                            </Col>
                            <Col>
                                <Title>해시태그</Title>
                                <Input className='hash' placeholder='#사과 #수박' />
                            </Col>
                        </Row>
                        {params.table != 'oneword' && params.table != 'oneevent' ?
                            <>
                                <Row>
                                    <Col>
                                        <Title>카드 글자색</Title>
                                        <Input type={'color'} className='font-color' style={{ background: '#fff', height: '36px', width: '220px' }} />
                                    </Col>
                                    <Col>
                                        <Title>카드 배경색</Title>
                                        <Input type={'color'} className='background-color' style={{ background: '#fff', height: '36px', width: '220px' }} />
                                    </Col>
                                </Row>
                            </>
                            :
                            <>
                            </>}

                        <Row>
                            <Col>
                                <Title>내용</Title>
                                <div id="editor">
                                    <Editor
                                        placeholder="내용을 입력해주세요."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax]}
                                        language="ko-KR"
                                        ref={editorRef}
                                        onChange={onChangeEditor}
                                        hooks={{
                                            addImageBlobHook: async (blob, callback) => {

                                                noteFormData.append('note', blob);
                                                const { data: response } = await axios.post('/api/addimage', noteFormData);
                                                if (response.result > 0) {
                                                    callback(backUrl + response.data.filename)
                                                    noteFormData.delete('note');
                                                } else {
                                                    noteFormData.delete('note');
                                                    return;
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>

                    </Card>
                    <ButtonContainer>
                        <AddButton onClick={editItem}>{'저장'}</AddButton>
                    </ButtonContainer>
                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MItemEdit;