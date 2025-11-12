import NoFooterLayout from "@/component/layouts/NoFooterLayout";
import NoLayout from "@/component/layouts/NoLayout";
import AdminLayout from "@/component/layouts/AdminLayout";
import DefaultLayout from "@/component/layouts/DefaultLayout";
import LiveLayout from "@/component/layouts/LiveLayout";
import SettingLayout from "@/component/layouts/SettingsLayout/SettingsLayout";

import config from "@/config";

import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import NotFound from "@/Pages/NotFound";
import Profile from "@/Pages/Profile";
import Explore from "@/Pages/Explore";
import Messages from "@/component/Message/Messages/Messages";
import StudioPage from "@/Pages/Studio";
import DashboardPage from "@/Pages/Studio/components/dashboard/DashboardPage";
import PostsPage from "@/Pages/Studio/components/posts/PostsPage";
import UploadPage from "@/Pages/Studio/components/upload/UploadPage";
import EditPostPage from "@/Pages/Studio/components/posts/EditPostPage";
import AnalyticsPage from "@/Pages/Studio/components/analytics/AnalyticsPage";
import CommentsPage from "@/Pages/Studio/components/comments/CommentsPage";
import LivePage from "@/Pages/Live";
import LiveDetailPage from "@/Pages/Live/LiveDetailPage";
import LiveStudio from "@/Pages/LiveStudio";
import SettingsPage from "@/Pages/Settings";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";
import ResetPassword from "@/Pages/ResetPassword/ResetPassword";
import SearchPage from "@/component/Search/SearchPage/SearchPage";
import VerifyEmail from "@/Pages/VerifyEmail/VerifyEmail";
import VerifyOtp from "@/Pages/VerifyOtp/VerifyOtp";
import NotificationPage from "@/component/Notifications";

const routes = [
  // Public routes
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.login, component: Login, layout: NoFooterLayout },
  { path: config.routes.register, component: Register, layout: NoLayout },
  { path: config.routes.verifyEmail, component: VerifyEmail, layout: NoLayout },
  { path: config.routes.verifyOtp, component: VerifyOtp, layout: NoLayout },
  { path: config.routes.resetPassword, component: ResetPassword, layout: NoLayout },
  { path: config.routes.explore, component: Explore, layout: DefaultLayout },
  { path: "/search", component: SearchPage, layout: DefaultLayout },
  { path: config.routes.live, component: LivePage, layout: LiveLayout },
  { path: config.routes.liveDetail, component: LiveDetailPage, layout: LiveLayout },
  { path: config.routes.notFound, component: NotFound, layout: NoLayout },

  // Protected routes
  { path: config.routes.changePassword, component: ChangePassword, layout: NoLayout, protected: true },
  { path: config.routes.liveStudio, component: LiveStudio, layout: LiveLayout, protected: true },
  { path: config.routes.settings, component: SettingsPage, layout: SettingLayout, protected: true },
  { path: config.routes.messages, component: Messages, layout: DefaultLayout, protected: true },
  {
    path: config.routes.studio,
    component: StudioPage,
    layout: NoLayout,
    protected: true,
    children: [
      { index: true, component: DashboardPage },
      { path: "posts", component: PostsPage },
      { path: "posts/:id/edit", component: EditPostPage },
      { path: "upload", component: UploadPage },
      { path: "analytics", component: AnalyticsPage },
      { path: "comments", component: CommentsPage },
    ],
  },
  // { path: config.routes.notifications, component:NotificationPage, layout: DefaultLayout , protected:true},
  { path: config.routes.profile, component: Profile, layout: DefaultLayout },
];

export default routes;
