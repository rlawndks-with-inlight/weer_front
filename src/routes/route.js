import Home from '../pages/User/Home';

import Search from '../pages/User/Search';
import SelectIssueCategory from '../pages/User/SelectIssueCategory';
import SelectFeatureCategory from '../pages/User/SelectFeatureCategory';
import MasterList from '../pages/User/MasterList';
import ThemeList from '../pages/User/ThemeList';
import VideoList from '../pages/User/VideoList';

import AppSetting from '../pages/User/AppSetting';

import Login from '../pages/User/Auth/Login';
import MyPage from '../pages/User/Auth/MyPage';
import EditMyInfo from '../pages/User/Auth/EditMyInfo';
import FindMyInfo from '../pages/User/Auth/FindMyInfo';
import SignUp from '../pages/User/Auth/SignUp';
import Resign from '../pages/User/Auth/Resign';
import KakaoRedirectHandler from '../pages/User/Auth/KakaoRedirectHandler';

import OneEventList from '../pages/User/OneEvent/OneEventList';
import OneWordList from '../pages/User/OneWord/OneWordList';
import NoticeList from '../pages/User/Notice/NoticeList';
import IssueList from '../pages/User/Issues/IssueList';
import FeatureList from '../pages/User/Feature/FeatureList';
import Master from '../pages/User/Master/Master';

import Post from '../pages/User/Posts/Post';
import Video from '../pages/User/Posts/Video';

import Policy from '../pages/User/Policy/Policy';

import MLogin from '../pages/Manager/MLogin';
import MUserEdit from '../pages/Manager/MUserEdit';
import MMasterEdit from '../pages/Manager/MMasterEdit';
import MIssueCategoryEdit from '../pages/Manager/MIssueCategoryEdit';
import MFeatureCategoryEdit from '../pages/Manager/MFeatureCategoryEdit';
import MVideoEdit from '../pages/Manager/MVideoEdit';
import MNoticeEdit from '../pages/Manager/MNoticeEdit';
import MSettingEdit from '../pages/Manager/MSettingEdit';

import MItemEdit from '../pages/Manager/MItemEdit';
import MItemList from '../pages/Manager/MItemList';
import MChannelEdit from '../pages/Manager/MChannelEdit';
import Notice from '../pages/User/Notice/Notice';
import MAlarmEdit from '../pages/Manager/MAlarmEdit';
import MPopupEdit from '../pages/Manager/MPopupEdit';

const zRoute = [
    { link: '/', element: <Home />, title: "???" },
    { link: '/home', element: <Home />, title: "???" },
    { link: '/search', element: <Search />, title: "??????" },
    
    { link: '/appsetting', element: <AppSetting />, title: "??? ??????" },

    { link: '/selectissuecategory', element: <SelectIssueCategory />, title: "????????????" },
    { link: '/selectfeaturecategory', element: <SelectFeatureCategory />, title: "?????????" },
    { link: '/masterlist', element: <MasterList />, title: "???????????????" },
    { link: '/themelist', element: <ThemeList />, title: "????????????" },
    { link: '/videolist', element: <VideoList />, title: "???????????????" },
    { link: '/issuelist/:pk', element: <IssueList />, title: "????????????" },
    { link: '/featurelist/:pk', element: <FeatureList />, title: "?????????" },
    { link: '/onewordlist', element: <OneWordList />, title: "??????1??????" },
    { link: '/oneeventlist', element: <OneEventList />, title: "??????1??????" },
    { link: '/noticelist', element: <NoticeList />, title: "????????????" },
    { link: '/master/:pk', element: <Master />, title: "???????????????" },

    { link: '/login', element: <Login />, title: "?????????" },
    { link: '/mypage', element: <MyPage />, title: "???????????????" },
    { link: '/editmyinfo', element: <EditMyInfo />, title: "????????????" },
    { link: '/findmyinfo', element: <FindMyInfo />, title: "?????????/???????????? ??????" },
    { link: '/signup', element: <SignUp />, title: "????????????" },
    { link: '/resign', element: <Resign />, title: "????????????" },
    { link: '/oauth/callback/kakao', element: <KakaoRedirectHandler />, title: "" },

    { link: '/post/notice/:pk', element: <Notice />, title: "????????????" },
    { link: '/post/:table/:pk', element: <Post />, title: "?????????" },
    { link: '/video/:pk', element: <Video />, title: "???????????????" },

    { link: '/policy/:pk', element: <Policy />, title: "" },

    { link: '/manager', element: <MLogin />, title: "??????????????????" },
    { link: '/manager/login', element: <MLogin />, title: "??????????????????" },
    { link: '/manager/edit/user/:pk', element: <MUserEdit />, title: "????????????" },
    { link: '/manager/edit/master/:pk', element: <MMasterEdit />, title: "????????????" },
    { link: '/manager/edit/channel/:pk', element: <MChannelEdit />, title: "????????????" },
    { link: '/manager/edit/video/:pk', element: <MVideoEdit />, title: "?????????????????????" },
    { link: '/manager/edit/notice/:pk', element: <MNoticeEdit />, title: "??????????????????" },
    { link: '/manager/edit/alarm/:pk', element: <MAlarmEdit />, title: "????????????" },
    { link: '/manager/edit/popup/:pk', element: <MPopupEdit />, title: "????????????" },
    { link: '/manager/edit/issue_category/:pk', element: <MIssueCategoryEdit />, title: "??????????????????????????????" },
    { link: '/manager/edit/feature_category/:pk', element: <MFeatureCategoryEdit />, title: "???????????????????????????" },
    { link: '/manager/edit/setting', element: <MSettingEdit />, title: "????????????" },
    { link: '/manager/edit/:table/:pk', element: <MItemEdit />, title: "" },
    { link: '/manager/list/:table/:pk', element: <MItemList />, title: "" },
    { link: '/manager/list/:table', element: <MItemList />, title: "" },
]
export { zRoute }