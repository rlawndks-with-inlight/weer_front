import Home from '../pages/User/Home';

import SelectIssueCategory from '../pages/User/SelectIssueCategory';
import MasterList from '../pages/User/MasterList';
import ThemeList from '../pages/User/ThemeList';
import VideoList from '../pages/User/VideoList';
import Inquiry from '../pages/User/Inquiry';

import OneEventList from '../pages/User/OneEvent/OneEventList';
import OneWordList from '../pages/User/OneWord/OneWordList';
import IssueList from '../pages/User/Issues/IssueList';
import Master from '../pages/User/Master/Master';

import Post from '../pages/User/Posts/Post';
import Video from '../pages/User/Posts/Video';

import MLogin from '../pages/Manager/MLogin';
import MUserEdit from '../pages/Manager/MUserEdit';
import MMasterEdit from '../pages/Manager/MMasterEdit';
import MSetting from '../pages/Manager/MSetting';
import MIssueCategoryEdit from '../pages/Manager/MIssueCategoryEdit';
import MVideoEdit from '../pages/Manager/MVideoEdit';
import MSettingEdit from '../pages/Manager/MSettingEdit';

import MItemEdit from '../pages/Manager/MItemEdit';
import MItemList from '../pages/Manager/MItemList';

const zRoute = [
    { link: '/', element: <Home /> },

    { link: '/selectissuecategory', element: <SelectIssueCategory /> },
    { link: '/masterlist', element: <MasterList /> },
    { link: '/themelist', element: <ThemeList /> },
    { link: '/videolist', element: <VideoList /> },
    { link: '/inquiry', element: <Inquiry /> },
    { link: '/issuelist/:pk', element: <IssueList /> },
    { link: '/onewordlist', element: <OneWordList /> },
    { link: '/oneeventlist', element: <OneEventList /> },
    { link: '/master/:pk', element: <Master /> },

    { link: '/post/:table/:pk', element: <Post /> },
    { link: '/video/:pk', element: <Video /> },

    { link: '/manager', element: <MLogin /> },
    { link: '/manager/login', element: <MLogin /> },
    { link: '/manager/edit/user/:pk', element: <MUserEdit /> },
    { link: '/manager/edit/master/:pk', element: <MMasterEdit /> },
    { link: '/manager/setting', element: <MSetting /> },
    { link: '/manager/edit/video/:pk', element: <MVideoEdit /> },
    { link: '/manager/edit/issue_category/:pk', element: <MIssueCategoryEdit /> },
    { link: '/manager/edit/setting', element: <MSettingEdit /> },
    { link: '/manager/edit/:table/:pk', element: <MItemEdit /> },
    { link: '/manager/list/:table/:pk', element: <MItemList /> },
    { link: '/manager/list/:table', element: <MItemList /> },
]
export { zRoute }