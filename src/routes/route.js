import Home from '../pages/User/Home';

import Search from '../pages/User/Search';
import SelectIssueCategory from '../pages/User/SelectIssueCategory';
import SelectFeatureCategory from '../pages/User/SelectFeatureCategory';
import MasterList from '../pages/User/MasterList';
import ThemeList from '../pages/User/ThemeList';
import VideoList from '../pages/User/VideoList';

import Login from '../pages/User/Auth/Login';
import MyPage from '../pages/User/Auth/MyPage';
import EditMyInfo from '../pages/User/Auth/EditMyInfo';
import SignUp from '../pages/User/Auth/SignUp';

import OneEventList from '../pages/User/OneEvent/OneEventList';
import OneWordList from '../pages/User/OneWord/OneWordList';
import NoticeList from '../pages/User/Notice/NoticeList';
import IssueList from '../pages/User/Issues/IssueList';
import FeatureList from '../pages/User/Feature/FeatureList';
import Master from '../pages/User/Master/Master';

import Post from '../pages/User/Posts/Post';
import Video from '../pages/User/Posts/Video';

import MLogin from '../pages/Manager/MLogin';
import MUserEdit from '../pages/Manager/MUserEdit';
import MMasterEdit from '../pages/Manager/MMasterEdit';
import MSetting from '../pages/Manager/MSetting';
import MIssueCategoryEdit from '../pages/Manager/MIssueCategoryEdit';
import MFeatureCategoryEdit from '../pages/Manager/MFeatureCategoryEdit';
import MVideoEdit from '../pages/Manager/MVideoEdit';
import MNoticeEdit from '../pages/Manager/MNoticeEdit';
import MSettingEdit from '../pages/Manager/MSettingEdit';

import MItemEdit from '../pages/Manager/MItemEdit';
import MItemList from '../pages/Manager/MItemList';
import MChannelEdit from '../pages/Manager/MChannelEdit';
import Notice from '../pages/User/Notice/Notice';

const zRoute = [
    { link: '/', element: <Home /> },
    { link: '/search', element: <Search /> },

    { link: '/selectissuecategory', element: <SelectIssueCategory /> },
    { link: '/selectfeaturecategory', element: <SelectFeatureCategory/> },
    { link: '/masterlist', element: <MasterList /> },
    { link: '/themelist', element: <ThemeList /> },
    { link: '/videolist', element: <VideoList /> },
    { link: '/issuelist/:pk', element: <IssueList /> },
    { link: '/featurelist/:pk', element: <FeatureList /> },
    { link: '/onewordlist', element: <OneWordList /> },
    { link: '/oneeventlist', element: <OneEventList /> },
    { link: '/noticelist', element: <NoticeList /> },
    { link: '/master/:pk', element: <Master /> },

    { link: '/login', element: <Login /> },
    { link: '/mypage', element: <MyPage /> },
    { link: '/editmyinfo', element: <EditMyInfo /> },
    { link: '/signup', element: <SignUp /> },

    { link: '/post/notice/:pk', element: <Notice /> },
    { link: '/post/:table/:pk', element: <Post /> },
    { link: '/video/:pk', element: <Video /> },

    { link: '/manager', element: <MLogin /> },
    { link: '/manager/login', element: <MLogin /> },
    { link: '/manager/edit/user/:pk', element: <MUserEdit /> },
    { link: '/manager/edit/master/:pk', element: <MMasterEdit /> },
    { link: '/manager/edit/channel/:pk', element: <MChannelEdit /> },
    { link: '/manager/setting', element: <MSetting /> },
    { link: '/manager/edit/video/:pk', element: <MVideoEdit /> },
    { link: '/manager/edit/notice/:pk', element: <MNoticeEdit /> },
    { link: '/manager/edit/issue_category/:pk', element: <MIssueCategoryEdit /> },
    { link: '/manager/edit/feature_category/:pk', element: <MFeatureCategoryEdit /> },
    { link: '/manager/edit/setting', element: <MSettingEdit /> },
    { link: '/manager/edit/:table/:pk', element: <MItemEdit /> },
    { link: '/manager/list/:table/:pk', element: <MItemList /> },
    { link: '/manager/list/:table', element: <MItemList /> },
]
export { zRoute }