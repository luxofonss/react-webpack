import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  endpoints: (build) => ({
    getTodoList: build.query({
      query: () => 'todos'
    })
  })
})

export const { useGetTodoListQuery } = todoApi
