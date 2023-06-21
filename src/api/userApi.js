import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/', //CHANGE THIS TO READ FROM ENV
    credentials: 'include'
  }),
  endpoints: (builder) => { return {
    signin: builder.query({
      query: () => { return {
        url: 'signin'
      }}
    }),
    findUserInfo: builder.query({
      query: () => { return {
        url: 'userinfo'
      }}
    })
  }}
})

export const {
  useSigninQuery,
  useFindUserInfoQuery
} = userApi;