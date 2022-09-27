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
import { Card, Title, Input, Row, Col, ImageContainer, Textarea } from '../../components/elements/ManagerTemplete';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Picker from 'emoji-picker-react';
import { backUrl } from '../../data/Data';
import { objManagerListContent } from '../../data/Data';
import { categoryToNumber } from '../../functions/utils';
import CommentComponent from '../../components/CommentComponent';
import theme from '../../styles/theme';
import { AiFillFileImage } from 'react-icons/ai'
import { IoRadioButtonOff, IoRadioButtonOn } from 'react-icons/io5'
const MAlarmEdit = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const editorRef = useRef();
    const [comments, setComments] = useState([]);
    const [myNick, setMyNick] = useState("")
    const [auth, setAuth] = useState({});
    const [noteFormData] = useState(new FormData());
    const [radioNum, setRadioNum] = useState(1);
    useEffect(() => {
        let authObj = JSON.parse(localStorage.getItem('auth'));
        setAuth(authObj);
        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=notice&pk=${params.pk}`);
                $(`.title`).val(response.data.title);
                editorRef.current.getInstance().setHTML(response.data.note.replaceAll('http://localhost:8001', backUrl));
            }
        }
        $('div.toastui-editor-defaultUI-toolbar > div:nth-child(4)').append(`<button type="button" class='emoji' aria-label='이모티콘' style='font-size:18px;'>🙂</button>`);
        fetchPost();
        fetchComments();
    }, [pathname])
    useEffect(() => {
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
    }, [])
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        editorRef.current.getInstance().insertText(emojiObject.emoji)
    };
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk}&category=${categoryToNumber('notice')}`);
        console.log(response)
        setComments(response.data);
    }
    const editItem = async () => {
        if (!$(`.title`).val()) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                user_pk: auth.pk,
                title: $('.title').val(),
                note: $(`.note`).val()
            }
            if (params.pk > 0) obj.pk = params.pk;

            if (window.confirm(`저장하시겠습니까?`)) {

                if (params.pk > 0) {
                    updateItem('alarm', obj);
                } else {
                    addItem('alarm', obj);
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
    const handleClickRadio = (e) => {
        console.log(e.target.value)
        setRadioNum(e.target.value)
    }
    return (
        <>
            <ManagerWrappers>
                <SideBar />
                <ManagerContentWrappers>
                    <Breadcrumb title={objManagerListContent[`alarm`].breadcrumb} nickname={myNick} />
                    <Card>
                        <Row>
                            <Col>
                                <Title>프로필 이미지 <br /></Title>
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
                                <Title>제목</Title>
                                <Input className='title' placeholder='제목을 입력해 주세요.' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>내용</Title>
                                <Textarea className='note' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Title>알람타입</Title>
                                <Row>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IoRadioButtonOff/>
                                    <IoRadioButtonOn/>
                                        <input type={'radio'} name='alarm-type' id='alarm-1' checked={radioNum == 1} value={'1'} onChange={handleClickRadio} />
                                        <label for='alarm-1'>바로실행</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type={'radio'} name='alarm-type' id='alarm-2' value={'2'} onChange={handleClickRadio} />
                                        <label for='alarm-2'>반복실행</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type={'radio'} name='alarm-type' id='alarm-3' value={'3'} onChange={handleClickRadio} />
                                        <label for='alarm-3'>정해진 시간에 실행</label>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Row>

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
export default MAlarmEdit;