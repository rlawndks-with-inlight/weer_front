import React, { useMemo } from 'react'
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
import { addItem, base64toFile, settingQlEditor, updateItem } from '../../functions/utils';
import { Card, Title, Input, Row, Col, Select } from '../../components/elements/ManagerTemplete';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Picker from 'emoji-picker-react';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import { backUrl } from '../../data/Data';
import { objManagerListContent } from '../../data/Data';
import { categoryToNumber } from '../../functions/utils';
import CommentComponent from '../../components/CommentComponent';
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";
const MProhibitCommentEdit = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();
    const [comments, setComments] = useState([]);
    const [myNick, setMyNick] = useState("")
    const [auth, setAuth] = useState({});
    const [noteFormData] = useState(new FormData());
    const [channelList, setChannelList] = useState([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        let authObj = JSON.parse(localStorage.getItem('auth'));
        setAuth(authObj);
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=prohibit_comment&pk=${params.pk}`);
                $(`.note`).val(response.data.note);
            }
        }
        fetchPost();
    }, [pathname])

    const editItem = async () => {

        if (!$(`.note`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                note: $(`.note`).val()
            }
            if (params.pk > 0) obj.pk = params.pk;

            if (window.confirm(`저장하시겠습니까?`)) {
                if (params.pk > 0) {
                    updateItem('prohibitcomment', obj);
                } else {
                    addItem('prohibitcomment', obj);
                }
            }
        }
    }

    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`prohibit_comment`].breadcrumb + `${params.pk > 0 ? '수정' : '추가'}`} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>금지단어</Title>
                                <Input className='note' placeholder='단어을 입력해 주세요.' />
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
export default MProhibitCommentEdit;