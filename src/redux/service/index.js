import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '@src/configs/customFetchBase'

const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    getShopById: build.query({
      query: (id) => `/user/${id}`
    }),
    updateUserInfo: build.mutation({
      query: (body) => ({
        url: '/user/update',
        method: 'PUT',
        body: body
      })
    }),
    getProductAttributes: build.query({
      query: (args) => ({
        url: '/product/attributes',
        params: args
      })
    }),
    getCategory: build.query({
      query: ({ id }) => ({
        url: `/category/${id}`
      })
    }),
    getNotification: build.query({
      query: () => ({
        url: '/notification'
      })
    })
  })
})

export default appApi
