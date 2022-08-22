import { IoCaretForwardCircleOutline, IoAlbumsOutline } from "react-icons/io5"
import { HiOutlineLightBulb } from 'react-icons/hi'
import { FaRegThumbsUp } from 'react-icons/fa'
import { TbMessageDots } from 'react-icons/tb'
import thumbImg from '../assets/images/icon/thumb.svg'
export const backUrl = "http://localhost:8001";
export const zBottomMenu = [
    { name: '핵심이슈', link: '/coreissue', icon: <HiOutlineLightBulb className='menu-icon' style={{ fontSize: '32px' }} />, allowList: ['/coreissue'] },
    { name: '퍼스트전문가', link: '/firstexpert', icon: <FaRegThumbsUp className='menu-icon' />, allowList: ['/firstexpert'] },
    { name: '핵심테마', link: '/coretheme', icon: <IoAlbumsOutline className='menu-icon' />, allowList: ['/coretheme'] },
    { name: '핵심비디오', link: '/corevideo', icon: <IoCaretForwardCircleOutline className='menu-icon' />, allowList: ['/corevideo'] },
    { name: '상담문의', link: '/require', icon: <TbMessageDots className='menu-icon' />, allowList: ['/require'] }
];
export const objManagerListContent = {
    user: {
        breadcrumb: '회원',
        zColumn: [
            { name: '아이디', width: 11, type: 'text', column: 'id' },
            { name: '닉네임', width: 11, type: 'text', column: 'nickname' },
            { name: '이름', width: 11, type: 'text', column: 'name' },
            { name: '폰번호', width: 22, type: 'text', column: 'phone' },
            { name: '레벨', width: 11, type: 'level', column: 'user_level' },
            { name: '로그인시간', width: 22, type: 'text', column: 'last_login' },
            { name: '수정', width: 6, type: 'edit', column: 'edit' },
            { name: '삭제', width: 6, type: 'delete', column: 'delete' }
        ]
    },
    master: {
        breadcrumb: '전문가',
        zColumn: [
            { name: '프로필이미지', width: 16, type: 'img', column: 'profile_img' },
            { name: '아이디', width: 16, type: 'text', column: 'id' },
            { name: '이름', width: 16, type: 'text', column: 'name' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    oneword: {
        breadcrumb: '하루1단어',
        zColumn: [
            { name: '프로필이미지', width: 16, type: 'img', column: 'profile_img' },
            { name: '아이디', width: 16, type: 'text', column: 'id' },
            { name: '이름', width: 16, type: 'text', column: 'name' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    oneevent: {
        breadcrumb: '하루1종목',
        zColumn: [
            { name: '프로필이미지', width: 16, type: 'img', column: 'profile_img' },
            { name: '아이디', width: 16, type: 'text', column: 'id' },
            { name: '이름', width: 16, type: 'text', column: 'name' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    theme: {
        breadcrumb: '핵심테마',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    issue: {
        breadcrumb: '핵심이슈&공시',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    issue_category: {
        breadcrumb: '핵심이슈&공시 카테고리',
        zColumn: [
            { name: '제목', width: 48, type: 'text', column: 'title' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    video: {
        breadcrumb: '핵심비디오',
        zColumn: [
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '링크', width: 32, type: 'link', column: 'link' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    inquiry: {
        breadcrumb: '문의',
        zColumn: [
            { name: '프로필이미지', width: 16, type: 'img', column: 'profile_img' },
            { name: '아이디', width: 16, type: 'text', column: 'id' },
            { name: '이름', width: 16, type: 'text', column: 'name' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    }
}
export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}