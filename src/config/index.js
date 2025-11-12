const config = {
    routes : {
        home : "/",

        //auth
        login : "/auth/login",
        register : "/auth/register",
        changePassword: "/auth/change-password",
        resetPassword: "/auth/reset-password",
        verifyEmail: "/auth/verify-email",
        verifyOtp: "/auth/verify-otp",
        // user
        profile:"/profile/:username",
        edit:"/profile/:username/edit",
        user: "/users",
        notFound:"*",

        // pages
        explore:"/explore",
        messages: "/messages",
        live: "/live",
        liveDetail: "/live/:id",
        liveStudio: "/live-studio",
        settings: "/settings",

        // studio
        studio: "/studio",
        studioPosts: "/studio/posts",
        studioUpload: "/studio/upload",
        studioAnalytics: "/studio/analytics",
        studioComments: "/studio/comments",
        studioInspiration: "/studio/inspiration",
        studioAcademy: "/studio/academy",
        studioAudio: "/studio/audio",
        studioFeedback: "/studio/feedback",

        // notification
        notifications:"/notifications"
    }
}

export default config;