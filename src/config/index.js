const config = {
    routes : {
        home : "/",

        // products
        products : "/products",
        productDetail: "/products/:slug",

        //auth
        login : "/login",
        register : "/register",
        changePassword: "/change-password",
        resetPassword: "/reset-password",
        verifyEmail: "/verify-email",
        verifyOtp: "/verify-otp",
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
    }
}

export default config;