import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const productApi = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (header) => {
            header.set(
                "Authorization",
                `Bearer ${localStorage.getItem("token")}`
            )
        }
     }),

    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => '/products'
        }),
        getDetailProduct: build.query({
            query: (id) => `/products/${id}`
        }),

    })
})

export const {
  useGetAllProductsQuery, useGetDetailProductQuery
} = productApi
