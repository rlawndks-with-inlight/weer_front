import '../styles/style.css'
import { AiOutlineMail } from 'react-icons/ai'
import { IoVideocamOutline, IoChatbubbleOutline } from "react-icons/io5"
import { BsWallet2 } from 'react-icons/bs'
import { MdPersonOutline } from 'react-icons/md'
export const zBottomMenu = [
    { name: '핵심이슈', link: '/coreissue', icon: <AiOutlineMail className='menu-icon' />, allowList: ['/coreissue'] },
    { name: '퍼스트전문가', link: '/firstexpert', icon: <BsWallet2 className='menu-icon' />, allowList: ['/firstexpert'] },
    { name: '핵심테마', link: '/coretheme', icon: <IoVideocamOutline className='menu-icon' />, allowList: ['/coretheme'] },
    { name: '핵심비디오', link: '/corevideo', icon: <IoChatbubbleOutline className='menu-icon' />, allowList: ['/corevideo'] },
    { name: '상담문의', link: '/require', icon: <MdPersonOutline className='menu-icon' />, allowList: ['/require'] }
];