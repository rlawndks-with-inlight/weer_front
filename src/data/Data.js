import {IoCaretForwardCircleOutline, IoAlbumsOutline } from "react-icons/io5"
import {HiOutlineLightBulb} from 'react-icons/hi'
import {FaRegThumbsUp} from 'react-icons/fa'
import {TbMessageDots} from 'react-icons/tb'
import thumbImg from '../assets/images/icon/thumb.svg'
export const backUrl = "http://localhost:8001";
export const zBottomMenu = [
    { name: '핵심이슈', link: '/coreissue', icon: <img src={thumbImg} />, allowList: ['/coreissue'] },
    { name: '퍼스트전문가', link: '/firstexpert', icon: <FaRegThumbsUp className='menu-icon' />, allowList: ['/firstexpert'] },
    { name: '핵심테마', link: '/coretheme', icon: <IoAlbumsOutline className='menu-icon' />, allowList: ['/coretheme'] },
    { name: '핵심비디오', link: '/corevideo', icon: <IoCaretForwardCircleOutline className='menu-icon' />, allowList: ['/corevideo'] },
    { name: '상담문의', link: '/require', icon: <TbMessageDots className='menu-icon' />, allowList: ['/require'] }
];