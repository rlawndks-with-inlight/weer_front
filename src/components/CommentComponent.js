import { IoImageOutline } from 'react-icons/io5'
import AddButton from "./elements/button/AddButton";
import theme from '../styles/theme';
import { Content } from './elements/UserContentTemplete';
import { backUrl } from '../data/Data';
import axios from 'axios';
import defaultImg from '../assets/images/icon/default-profile.png';
import { useEffect, useState } from 'react';
import { TbArrowForward } from 'react-icons/tb'
const CommentInputContent = (props) => {
    const { addComment, parentPk } = props;
    return (
        <>
            <div style={{ border: `1px solid ${theme.color.font3}`, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                <textarea style={{ outline: 'none', resize: 'none', border: 'none', height: '54px', fontSize: theme.size.font4 }} className={`comment-${parentPk}`} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
                    <IoImageOutline style={{ color: theme.color.font3 }} />
                    <AddButton style={{ background: theme.color.font2, boxShadow: 'none' }} onClick={() => addComment(parentPk)}>작성</AddButton>
                </div>
            </div>
        </>
    )
}
const CommentContent = (props) => {
    const { item, deleteComment, isReply, displayReplyInput } = props;
    return (
        <>
            <div style={{ borderBottom: `1px solid ${theme.color.font3}`, display: 'flex', padding: '16px', fontSize: theme.size.font4, width: `${isReply ? '90%' : '100%'}`, margin: `${isReply ? '0 0 0 auto' : '0'}` }}>
                {isReply ?
                    <>
                        <TbArrowForward style={{ fontSize: theme.size.font2 }} />
                    </>
                    :
                    <>
                    </>}
                <img alt="프로필 사진" src={item?.profile_img ? (item?.profile_img?.substring(0, 4) == 'http' ? item.profile_img : backUrl + item.profile_img) : defaultImg} style={{ width: '64px', height: '64px', borderRadius: '50%', marginRight: '16px' }} />

                <div>
                    <div style={{ marginBottom: '6px', display: 'flex' }}><div style={{ marginRight: '6px' }}>{item.nickname}</div> <div style={{ color: theme.color.font3 }}>{item.date.substring(0, 16)}</div></div>
                    <div style={{ wordBreak: 'break-all', marginBottom: '6px', fontSize: theme.size.font3 }}>{item.note}</div>
                    <div style={{ display: 'flex' }}>
                        {JSON.parse(localStorage.getItem('auth'))?.pk == item.user_pk || JSON.parse(localStorage.getItem('auth'))?.user_level >= 40 ?
                            <>
                                {isReply ?
                                    <>
                                    </>
                                    :
                                    <>
                                        <div style={{ marginRight: '6px', cursor: 'pointer' }} onClick={displayReplyInput}>답글</div>
                                    </>}
                                <div style={{ marginRight: '6px', cursor: 'pointer' }}>수정</div>
                                <div style={{ cursor: 'pointer' }} onClick={() => deleteComment(item.pk)}>지우기</div>
                            </>
                            :
                            <>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
const CommentComponent = (props) => {
    const { data, addComment, fetchComments } = props;
    const [zComment, setZComment] = useState([]);
    const [replyObj, setreplyObj] = useState({});
    const deleteComment = async (pk) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            let obj = {
                pk: pk,
                table: 'comment'
            }
            const { data: response } = await axios.post(`/api/deleteitem`, obj)
            if (response.result > 0) {
                fetchComments();
            } else {
                alert('error')
            }
        }
    }
    useEffect(() => {
        let comment_list = [...data];
        let comment_list_desc = [...comment_list].reverse();

        let list = [];
        let reply_obj = {};
        for (var i = 0; i < comment_list.length; i++) {
            if (comment_list[i]?.parent_pk == 0) {
                comment_list[i].reply_display = false;
                list.push(comment_list[i])
            }
        }
        for (var i = 0; i < comment_list_desc.length; i++) {
            if (comment_list_desc[i]?.parent_pk != 0) {
                if (!reply_obj[comment_list_desc[i]?.parent_pk]) {
                    reply_obj[comment_list_desc[i]?.parent_pk] = [];
                }
                reply_obj[comment_list_desc[i]?.parent_pk].push(comment_list_desc[i])
            }
        }
        setZComment(list);
        setreplyObj(reply_obj)

    }, [data])
    const displayReplyInput = (num) => {
        let list = [...zComment];
        for (var i = 0; i < list.length; i++) {
            if (list[i].pk == num) {
                list[i].reply_display = !list[i].reply_display;
            }
        }
        setZComment(list)
    }
    return (
        <>

            <Content style={{ marginTop: '32px' }}>
                {JSON.parse(localStorage.getItem('auth'))?.pk > 0 ?
                    <>
                        <CommentInputContent addComment={addComment} parentPk={0} />
                    </>
                    :
                    <>
                    </>
                }
            </Content>


            <Content>
                {zComment.length > 0 ?
                    <>
                        {zComment.map((item, index) => (
                            <>
                                <CommentContent item={item} deleteComment={deleteComment} displayReplyInput={() => displayReplyInput(item.pk)} />
                                {item?.reply_display ?
                                    <>
                                        <CommentInputContent addComment={addComment} parentPk={item.pk} />
                                    </>
                                    :
                                    <>
                                    </>}
                                {replyObj[item?.pk] ?
                                    <>
                                        {replyObj[item?.pk].map((itm, idx) => (
                                            <>
                                                <CommentContent item={itm} deleteComment={deleteComment} isReply={true} />
                                            </>
                                        ))}
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </>
                        ))}
                    </>
                    :
                    <>
                    </>}
            </Content>
        </>
    )
}
export default CommentComponent;