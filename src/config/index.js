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
    }
}

export default config;