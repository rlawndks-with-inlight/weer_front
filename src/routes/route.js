import Home from '../pages/User/Home';

import Letter from '../pages/User/Letter/Letter';
import LetterList from '../pages/User/Letter/LetterList';

import Card from '../pages/User/Card/Card';
import CardList from '../pages/User/Card/CardList';

import Office from '../pages/User/My/Office';

import Talk from '../pages/User/Talk/Talk';
import TalkList from '../pages/User/Talk/TalkList';

import Video from '../pages/User/Video/Video';
import VideoList from '../pages/User/Video/VideoList';

import MLogin from '../pages/Manager/MLogin';
import MUserList from '../pages/Manager/MUserList';
import MUserEdit from '../pages/Manager/MUserEdit';
import MAccessorList from '../pages/Manager/MAccessorList';
import MUserStatistics from '../pages/Manager/MUserStatistics';
import MMasterList from '../pages/Manager/MMasterList';
import MItemList from '../pages/Manager/MItemList';
const zRoute = [
    { link: '/', element: <Home /> },
    { link: '/letterlist', element: <LetterList /> },
    { link: '/letter/:pk', element: <Letter /> },
    { link: '/cardlist', element: <CardList /> },
    { link: '/card/:pk', element: <Card /> },
    { link: '/talklist', element: <TalkList /> },
    { link: '/talk/:pk', element: <Talk /> },
    { link: '/videolist', element: <VideoList /> },
    { link: '/talk/:pk', element: <Talk /> },
    { link: '/video/:pk', element: <Video /> },
    { link: '/my/office', element: <Office /> },
    { link: '/manager', element: <MLogin /> },
    { link: '/manager/login', element: <MLogin /> },
    { link: '/manager/userlist', element: <MUserList /> },
    { link: '/manager/user/:pk', element: <MUserEdit /> },
    { link: '/manager/accessorlist', element: <MAccessorList /> },
    { link: '/manager/userstatistics', element: <MUserStatistics /> },
    { link: '/manager/masterlist', element: <MMasterList /> },
    { link: '/manager/itemlist', element: <MItemList /> }
]
export { zRoute }