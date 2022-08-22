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
import MUserEdit from '../pages/Manager/MUserEdit';
import MMasterEdit from '../pages/Manager/MMasterEdit';
import MSetting from '../pages/Manager/MSetting';
import MIssueCategoryEdit from '../pages/Manager/MIssueCategoryEdit';
import MVideoEdit from '../pages/Manager/MVideoEdit';

import MItemEdit from '../pages/Manager/MItemEdit';
import MItemList from '../pages/Manager/MItemList';

const zRoute = [
    { link: '/', element: <Home /> },

    // { link: '/letterlist', element: <LetterList /> },
    // { link: '/letter/:pk', element: <Letter /> },
    // { link: '/cardlist', element: <CardList /> },
    // { link: '/card/:pk', element: <Card /> },
    // { link: '/talklist', element: <TalkList /> },
    // { link: '/talk/:pk', element: <Talk /> },
    // { link: '/videolist', element: <VideoList /> },
    // { link: '/talk/:pk', element: <Talk /> },
    // { link: '/video/:pk', element: <Video /> },
    // { link: '/my/office', element: <Office /> },


    { link: '/manager', element: <MLogin /> },
    { link: '/manager/login', element: <MLogin /> },
    { link: '/manager/edit/user/:pk', element: <MUserEdit /> },
    { link: '/manager/edit/master/:pk', element: <MMasterEdit /> },
    { link: '/manager/setting', element: <MSetting /> },
    { link: '/manager/edit/video/:pk', element: <MVideoEdit /> },
    { link: '/manager/edit/issue_category/:pk', element: <MIssueCategoryEdit /> },
    { link: '/manager/edit/:table/:pk', element: <MItemEdit /> },
    { link: '/manager/list/:table', element: <MItemList /> },
]
export { zRoute }