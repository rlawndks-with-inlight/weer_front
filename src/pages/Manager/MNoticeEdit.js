import React from 'react'
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
import { addItem, updateItem } from '../../functions/utils';
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

const MNoticeEdit = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const editorRef = useRef();
    const [comments, setComments] = useState([]);
    const [myNick, setMyNick] = useState("")
    const [auth, setAuth] = useState({});
    const [noteFormData] = useState(new FormData());
    const [channelList, setChannelList] = useState([]);
    useEffect(() => {
        let authObj = JSON.parse(localStorage.getItem('auth'));
        setAuth(authObj);
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=notice&pk=${params.pk}`);
                let obj = response.data??{};
                $(`.title`).val(response.data.title);
                $('.note-align').val(response.data.note_align);
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('https://weare-first.com:8443', backUrl));

                $('br').removeClass('ProseMirror-trailingBreak');
            }
        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='????????????' style='font-size:18px;'>????</button>`);
        fetchPost();
        fetchComments();
    }, [pathname])
    useEffect(()=>{
        $('html').on('click',function(e) { 
            if($(e.target).parents('.emoji-picker-react').length < 1 && $('.emoji-picker-react').css('display')=='flex'&& $(e.target).attr('class') != 'emoji'){
                $('.emoji-picker-react').attr('style', 'display: none !important')
            }
        });
        $('button.emoji').on('click', function () {
            if($('.emoji-picker-react').css('display')=='none'){
                $('.emoji-picker-react').attr('style', 'display: flex !important')
            }else{
                $('.emoji-picker-react').attr('style', 'display: none !important')
            }
        })
        $('.toastui-editor-toolbar-icons').on('click', function () {
            $('.emoji-picker-react').attr('style', 'display: none !important')
        })
    },[])
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        editorRef.current.getInstance().insertText(emojiObject.emoji)
    };
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk}&category=${categoryToNumber('notice')}`);
        setComments(response.data);
    }
    const editItem = async () => {
        
        if (!$(`.title`).val()) {
            alert('???????????? ??????????????????.');
        } else {
            $('br').removeClass('ProseMirror-trailingBreak')
            await new Promise((r) => setTimeout(r, 100));
            let obj = {
                user_pk: auth.pk,
                title: $('.title').val(),
                note_align: $('.note-align').val(),
                want_push: $(`.want-push`).val(),
                note: editorRef.current.getInstance().getHTML()
            }
            if (params.pk > 0) obj.pk = params.pk;

            if (window.confirm(`?????????????????????????`)) {

                if (params.pk > 0) {
                    updateItem('notice', obj);
                } else {
                    addItem('notice', obj);
                }



            }
        }
    }
    const onChangeEditor = (e) => {
        const data = editorRef.current.getInstance().getHTML();
    }
    const addComment = async (parent_pk) => {
        if (!$(`.comment-${parent_pk??0}`).val()) {
            alert('?????? ?????? ????????? ?????????.');
            return;

        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: params.pk,
            parentPk:parent_pk??0,
            note: $(`.comment-${parent_pk??0}`).val(),
            category: categoryToNumber('notice')
        })

        if (response.result > 0) {
            $(`.comment-${parent_pk??0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    const updateComment = async (pk) => {

        if (!$(`.update-comment-${pk ?? 0}`).val()) {
            alert('?????? ?????? ????????? ?????????.');
        }
        
        const { data: response } = await axios.post('/api/updatecomment', {
            pk: pk,
            note: $(`.update-comment-${pk ?? 0}`).val(),
        })
        
        if (response.result > 0) {
            $(`.update-comment-${pk ?? 0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`notice`].breadcrumb+`${params.pk>0?'??????':'??????'}`} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>??????</Title>
                                <Input className='title' placeholder='????????? ????????? ?????????.' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>?????? ??????</Title>
                                <Select className='note-align'>
                                    <option value={0}>?????????</option>
                                    <option value={1}>??????</option>
                                    <option value={2}>?????????</option>
                                </Select>
                            </Col>
                            {params.pk == 0 ?
                                <>
                                    <Col>
                                        <Title>?????? ??????</Title>
                                        <Select className='want-push'>
                                            <option value={1}>??????</option>
                                            <option value={0}>?????? ??????</option>
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
                                <Title>??????</Title>
                                <div id="editor">
                                    <Picker onEmojiClick={onEmojiClick} style={{ color: 'red' }} />
                                    <Editor
                                        placeholder="????????? ??????????????????."
                                        previewStyle="vertical"
                                        height="600px"
                                        initialEditType="wysiwyg"
                                        useCommandShortcut={false}
                                        useTuiEditorEmoji={true}
                                        hideModeSwitch={true}
                                        plugins={[colorSyntax, fontSize]}
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
                        <AddButton onClick={editItem}>{'??????'}</AddButton>
                    </ButtonContainer>
                    {params.pk > 0 ?
                        <>
                            <Card style={{ minHeight: '240px' }}>
                                <Row>
                                    <Col>
                                        <Title>?????? ??????</Title>
                                    </Col>
                                </Row>
                                <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} updateComment={updateComment} />
                            </Card>
                        </>
                        :
                        <></>
                    }

                </ManagerContentWrappers>
            </ManagerWrappers>
        </>
    )
}
export default MNoticeEdit;