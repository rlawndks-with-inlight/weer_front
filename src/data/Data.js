import { IoCaretForwardCircleOutline, IoAlbumsOutline } from "react-icons/io5"
import { HiOutlineLightBulb } from 'react-icons/hi'
import { FaRegThumbsUp } from 'react-icons/fa'
import { TbMessageDots } from 'react-icons/tb'
import { MdOutlineFeaturedPlayList } from 'react-icons/md'
import albumImg from '../assets/images/icon/albums.svg';
import albumActiveImg from '../assets/images/icon/albums-active.svg';
import bulbImg from '../assets/images/icon/bulb.svg';
import bulbActiveImg from '../assets/images/icon/bulb-active.svg';
import featureImg from '../assets/images/icon/features.svg';
import featureActiveImg from '../assets/images/icon/features-active.svg';
import talkImg from '../assets/images/icon/talk.svg';
import talkActiveImg from '../assets/images/icon/talk-active.svg';
import thumbImg from '../assets/images/icon/thumb.svg';
import thumbActiveImg from '../assets/images/icon/thumb-active.svg';
import logo from '../assets/images/test/logo.svg'
import { EditorState } from "draft-js"
export const backUrl = "https://weare-first.com:8443";
export const logoSrc = logo;
//http://weare-first.com:8001
export const editorState = {
    editorState: EditorState.createEmpty()
}

export const localization = {
    locale: 'ko',
}
export const zBottomMenu = [
    { name: '핵심이슈', link: '/selectissuecategory', icon: <img src={bulbImg} className='menu-icon' />, activeIcon: <img src={bulbActiveImg} className='menu-icon' />, allowList: ['/selectissuecategory'] },
    // { name: '핵심비디오', link: '/videolist', icon: <img src={playImg} className='menu-icon' />, activeIcon: <img src={playActiveImg} className='menu-icon' />, allowList: ['/videolist'] },
    { name: '특징주', link: '/selectfeaturecategory', icon: <img src={featureImg} className='menu-icon' />, activeIcon: <img src={featureActiveImg} className='menu-icon' />, allowList: ['/selectfeaturecategory'] },

    { name: '핵심테마', link: '/themelist', icon: <img src={albumImg} className='menu-icon' />, activeIcon: <img src={albumActiveImg} className='menu-icon' />, allowList: ['/themelist'] },
    { name: '전문가칼럼', link: '/masterlist', icon: <img src={thumbImg} className='menu-icon' />, activeIcon: <img src={thumbActiveImg} className='menu-icon' />, allowList: ['/masterlist'] },


    { name: '공지사항', link: '/noticelist', icon: <img src={talkImg} className='menu-icon' />, activeIcon: <img src={talkActiveImg} className='menu-icon' />, allowList: ['/noticelist'] }
];
export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const objManagerListContent = {
    user: {
        breadcrumb: '회원',
        schema: 'user',
        zColumn: [
            { name: '아이디', width: 11, type: 'text', column: 'id' },
            { name: '닉네임', width: 11, type: 'text', column: 'nickname' },
            { name: '이름', width: 11, type: 'text', column: 'name' },
            { name: '폰번호', width: 22, type: 'text', column: 'phone' },
            { name: '레벨', width: 11, type: 'level', column: 'user_level' },
            { name: '로그인시간', width: 22, type: 'text', column: 'last_login' },
            // { name: '상태', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 6, type: 'edit', column: 'edit' },
            { name: '삭제', width: 6, type: 'delete', column: 'delete' }
        ]
    },
    master: {
        breadcrumb: '전문가',
        schema: 'user',
        zColumn: [
            { name: '프로필이미지', width: 12, type: 'img', column: 'profile_img' },
            { name: '채널이미지', width: 12, type: 'img', column: 'channel_img' },
            { name: '아이디', width: 12, type: 'text', column: 'id' },
            { name: '이름', width: 12, type: 'text', column: 'name' },
            { name: '채널명', width: 12, type: 'text', column: 'nickname' },
            { name: '생성시간', width: 16, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    channel: {
        breadcrumb: '채널',
        schema: 'user',
        zColumn: [
            { name: '채널이미지', width: 24, type: 'img', column: 'channel_img' },
            { name: '채널명', width: 24, type: 'text', column: 'nickname' },
            { name: '생성시간', width: 28, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    },
    oneword: {
        breadcrumb: '하루1단어',
        schema: 'oneword',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    oneevent: {
        breadcrumb: '하루1종목',
        schema: 'oneevent',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    theme: {
        breadcrumb: '핵심테마',
        schema: 'theme',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    strategy: {
        breadcrumb: '전문가칼럼',
        schema: 'strategy',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    issue: {
        breadcrumb: '핵심이슈&공시',
        schema: 'issue',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    issue_category: {
        breadcrumb: '핵심이슈&공시 카테고리',
        schema: 'issue_category',
        zColumn: [
            { name: '제목', width: 48, type: 'text', column: 'title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    feature_category: {
        breadcrumb: '특징주 카테고리',
        schema: 'feature_category',
        zColumn: [
            { name: '제목', width: 48, type: 'text', column: 'title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    feature: {
        breadcrumb: '특징주',
        schema: 'feature',
        zColumn: [
            { name: '메인이미지', width: 16, type: 'img', column: 'main_img' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '추천제목', width: 16, type: 'text', column: 'suggest_title' },
            { name: '생성시간', width: 20, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    video: {
        breadcrumb: '핵심비디오',
        schema: 'video',
        zColumn: [
            { name: '번호', width: 8, type: 'text', column: 'pk' },
            { name: '제목', width: 16, type: 'text', column: 'title' },
            { name: '링크', width: 20, type: 'link', column: 'link' },
            { name: '생성시간', width: 16, type: 'text', column: 'date' },
            { name: '맨위로', width: 8, type: 'top', column: '' },
            { name: '노출여부', width: 8, type: 'status', column: 'status' },
            { name: '수정', width: 8, type: 'edit', column: 'edit' },
            { name: '삭제', width: 8, type: 'delete', column: 'delete' }
        ],
    },
    notice: {
        breadcrumb: '공지',
        schema: 'notice',
        zColumn: [
            { name: '제목', width: 38, type: 'text', column: 'title' },
            { name: '생성시간', width: 38, type: 'text', column: 'date' },
            { name: '수정', width: 12, type: 'edit', column: 'edit' },
            { name: '삭제', width: 12, type: 'delete', column: 'delete' }
        ],
    }
}
export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}
export const slideSetting = {
    infinite: false,
    dots: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2500,
    slidesToShow: 1.15,
    slidesToScroll: 1,
    breakpoint: 480,
    beforeChange: (current, next) => {console.log(current)},
    afterChange: current => {console.log(current)},
}