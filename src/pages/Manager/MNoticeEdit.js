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
      const [note, setNote] = useState("");
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [
                    { header: [1, 2, 3, 4, 5, 6] },
                    { font: [] }
                ],
                [{ size: [] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "underline", "strike", "blockquote", "regular"],
                [{ align: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
                ["emoji"],
                ["clean"],
                ["code-block"]
            ],
        },
        "emoji-toolbar": true,
        "emoji-textarea": true,
        "emoji-shortname": true
    }), [])
    const formats = [
        'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]
    Quill.register("modules/imageResize", ImageResize);
    Quill.register(
        {
            "formats/emoji": quillEmoji.EmojiBlot,
            "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
            "modules/emoji-textarea": quillEmoji.TextAreaEmoji,
            "modules/emoji-shortname": quillEmoji.ShortNameEmoji
        },
        true
    );
    useEffect(() => {
        let authObj = JSON.parse(localStorage.getItem('auth'));
        setAuth(authObj);
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=notice&pk=${params.pk}`);
                let obj = response.data??{};
                $(`.title`).val(response.data.title);
                $('.note-align').val(response.data.note_align);
                obj.note = obj.note.replaceAll('http://localhost:8001', backUrl);
                obj.note = obj.note.replaceAll('https://weare-first.com:8443', backUrl);
                setNote(obj.note);
                $('br').removeClass('ProseMirror-trailingBreak');
            }
        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='이모티콘' style='font-size:18px;'>🙂</button>`);
        fetchPost();
        fetchComments();
        settingQlEditor();
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
            alert('필요값이 비어있습니다.');
        } else {
            $('br').removeClass('ProseMirror-trailingBreak')
            await new Promise((r) => setTimeout(r, 100));
            let obj = {
                user_pk: auth.pk,
                title: $('.title').val(),
                note_align: $('.note-align').val(),
                want_push: $(`.want-push`).val(),
                note: note
            }
            if (params.pk > 0) obj.pk = params.pk;

            if (window.confirm(`저장하시겠습니까?`)) {

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
            alert('필수 값을 입력해 주세요.');
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
            $(`.comment-${parent_pk ?? 0}`).val("")
            fetchComments();
            if(response.result==150){
                alert(response.message);
            }
        } else {
            alert(response.message)
        }
    }
    const updateComment = async (pk) => {

        if (!$(`.update-comment-${pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
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
                    <Breadcrumb title={objManagerListContent[`notice`].breadcrumb+`${params.pk>0?'수정':'추가'}`} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>제목</Title>
                                <Input className='title' placeholder='제목을 입력해 주세요.' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>내용 정렬</Title>
                                <Select className='note-align'>
                                    <option value={0}>가운데</option>
                                    <option value={1}>왼쪽</option>
                                    <option value={2}>오른쪽</option>
                                </Select>
                            </Col>
                            {params.pk == 0 ?
                                <>
                                    <Col>
                                        <Title>푸쉬 발송</Title>
                                        <Select className='want-push'>
                                            <option value={1}>발송</option>
                                            <option value={0}>발송 안함</option>
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
                                <Title>내용</Title>
                                <div id="editor">
                                    <ReactQuill
                                        modules={modules}
                                        theme="snow"
                                        defaultValue={note ?? ""}
                                        value={note ?? ""}
                                        onChange={async (e) => {
                                            try {
                                                let note = e;
                                                if (e.includes('<img src="') && e.includes('base64,')) {
                                                    let base64_list = e.split('<img src="');
                                                    for (var i = 0; i < base64_list.length; i++) {
                                                        if (base64_list[i].includes('base64,')) {
                                                            let img_src = base64_list[i];
                                                            img_src = await img_src.split(`"></p>`);
                                                            let base64 = img_src[0];
                                                            img_src = await base64toFile(img_src[0], 'note.png');
                                                            let formData = new FormData();
                                                            await formData.append('note', img_src);
                                                            const { data: response } = await axios.post('/api/addimageitems', formData);
                                                            note = await note.replace(base64, `${backUrl + response?.data[0]?.filename}`)
                                                        }
                                                    }
                                                }
                                                setNote(note);
                                            } catch (err) {
                                                console.log(err);
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
                    {params.pk > 0 ?
                        <>
                            <Card style={{ minHeight: '240px' }}>
                                <Row>
                                    <Col>
                                        <Title>댓글 관리</Title>
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