import NoFooterLayout from "@/component/layouts/NoFooterLayout";
import NoLayout from "@/component/layouts/NoLayout"
import AdminLayout from "../component/layouts/AdminLayout";
import config from "../config";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";

import NoHeaderLayout from "@/component/layouts/NoHeaderLayout";
import Profile from "@/Pages/Profile";

import Explore from "@/Pages/Explore";
import DefaultLayout from "@/component/layouts/DefaultLayout";
import LiveLayout from "@/component/layouts/LiveLayout";

import Messages from "@/component/Message/Messages/Messages";
import StudioPage from "@/Pages/Studio";
import DashboardPage from "@/Pages/Studio/components/dashboard/DashboardPage";

// Placeholder components for now
import PostsPage from "@/Pages/Studio/components/posts/PostsPage";
import UploadPage from "@/Pages/Studio/components/upload/UploadPage";
import EditPostPage from "@/Pages/Studio/components/posts/EditPostPage";
import AnalyticsPage from "@/Pages/Studio/components/analytics/AnalyticsPage";
import CommentsPage from "@/Pages/Studio/components/comments/CommentsPage";
import LivePage from "@/Pages/Live";
import LiveDetailPage from "@/Pages/Live/LiveDetailPage";
import LiveStudio from "@/Pages/LiveStudio";
import SettingsPage from "@/Pages/Settings";
import SettingLayout from "@/component/layouts/SettingsLayout/SettingsLayout";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";
import ResetPassword from "@/Pages/ResetPassword/ResetPassword";
import SearchPage from "@/component/Search/SearchPage/SearchPage";
import VerifyEmail from "@/Pages/VerifyEmail/VerifyEmail";
import VerifyOtp from "@/Pages/VerifyOtp/VerifyOtp";

const routes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout
    },
    {
        path: config.routes.changePassword,
        component: ChangePassword,
        layout: NoLayout
    },
    {
        path: config.routes.resetPassword,
        component: ResetPassword,
        layout: NoLayout
    },
    {
        path: config.routes.verifyEmail,
        component: VerifyEmail,
        layout: NoLayout
    },
    {
        path: config.routes.verifyOtp,
        component: VerifyOtp,
        layout: NoLayout
    },
    {
        path: config.routes.live,
        component: LivePage,
        layout: LiveLayout
    },
    {
        path: config.routes.liveDetail,
        component: LiveDetailPage,
        layout: LiveLayout
    },
    {
        path: config.routes.liveStudio,
        component: LiveStudio,
        layout: LiveLayout
    },

   
    {   
        path: config.routes.login,
        component: Login,
        layout: NoFooterLayout
    },
    
    {
        path: config.routes.register,
        component: Register,
    },
   
    {
        path: config.routes.profile,
        component: Profile,
        layout: DefaultLayout
    },

    {
        path: config.routes.explore,
        component: Explore,
    },
    {
        path: config.routes.settings,
        component: SettingsPage,
        layout: SettingLayout
    },
    {
        path: config.routes.messages,
        component: Messages,
        layout: DefaultLayout
    },
    {
        path: '/search',
        component: SearchPage,
        layout: DefaultLayout
    },
    {
        path: config.routes.notFound,
        component: NotFound,
        layout: NoLayout
    },
    {
        path: config.routes.studio,
        component: StudioPage,
        layout: NoLayout,
        children: [
            {
                index: true, // This makes DashboardPage the default child route for /studio
                component: DashboardPage,
            },
            {
                path: "posts",
                component: PostsPage,
            },
            {
                path: "posts/:id/edit",
                component: EditPostPage,
            },
            {
                path: "upload",
                component: UploadPage,
            },
            {
                path: "analytics",
                component: AnalyticsPage,
            },
            {
                path: "comments",
                component: CommentsPage,
            },
        ],
    },
]

export default routes