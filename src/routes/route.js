import Home from '../pages/User/Home';

import SelectIssueCategory from '../pages/User/SelectIssueCategory';
import MasterList from '../pages/User/MasterList';
import ThemeList from '../pages/User/ThemeList';
import VideoList from '../pages/User/VideoList';
import Inquiry from '../pages/User/Inquiry';

import IssueList from '../pages/User/Issues/IssueList';

import Post from '../pages/User/Posts/Post';

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

    { link: '/selectissuecategory', element: <SelectIssueCategory /> },
    { link: '/masterlist', element: <MasterList /> },
    { link: '/themelist', element: <ThemeList /> },
    { link: '/videolist', element: <VideoList /> },
    { link: '/inquiry', element: <Inquiry /> },
    { link: '/issuelist/:pk', element: <IssueList /> },

    { link: '/post/:table/:pk', element: <Post /> },

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