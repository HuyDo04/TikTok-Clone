import NoFooterLayout from "@/component/layouts/NoFooterLayout";
import NoLayout from "@/component/layouts/NoLayout"
import AdminLayout from "../component/layouts/AdminLayout";
import config from "../config";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import User from "../Pages/User";
import NoHeaderLayout from "@/component/layouts/NoHeaderLayout";
import Profile from "@/Pages/Profile";
import Edit from "@/Pages/Edit";
import Explore from "@/Pages/Explore";
import DefaultLayout from "@/component/layouts/DefaultLayout";
import Products from "@/Pages/Products";
import ProductDetail from "@/Pages/ProductDetail";
import MessagePage from "@/component/Sidebar/component/message/MessagePage";
import StudioPage from "@/Pages/Studio";
import DashboardPage from "@/Pages/Studio/components/dashboard/DashboardPage";

// Placeholder components for now
import PostsPage from "@/Pages/Studio/components/posts/PostsPage";
import UploadPage from "@/Pages/Studio/components/upload/UploadPage";
import EditPostPage from "@/Pages/Studio/components/posts/EditPostPage";
import AnalyticsPage from "@/Pages/Studio/components/analytics/AnalyticsPage";
import CommentsPage from "@/Pages/Studio/components/comments/CommentsPage";

const routes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout
    },

     {
        path: config.routes.products,
        component: Products,
        // layout: DefaultLayout
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
        layout: AdminLayout
    },

    {   
        path: config.routes.user,
        component: User,
        protected: true,
        layout: NoHeaderLayout
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
        layout: NoHeaderLayout
    },
      {
        path: config.routes.edit,
        component: Edit,
        layout: NoHeaderLayout
    },
    {
        path: config.routes.explore,
        component: Explore,
    },
    {
        path: config.routes.messages,
        component: MessagePage,
        layout: DefaultLayout
    },
    {
        path: config.routes.notFound,
        component: NotFound
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