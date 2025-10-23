const config = {
    routes : {
        home : "/",

        // products
        products : "/products",
        productDetail: "/products/:slug",

        //auth
        login : "/login",
        register : "/register",
        // user
        profile:"/profile/:username",
        edit:"/profile/:username/edit",
        user: "/users",
        notFound:"*",

        // pages
        explore:"/explore",
        messages: "/messages",

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