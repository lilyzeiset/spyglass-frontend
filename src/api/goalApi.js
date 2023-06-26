import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const goalApi = createApi({
  reducerPath: 'goalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URI}/goal`, //CHANGE THIS TO READ FROM ENV
    credentials: 'include'
  }),
    endpoints: (builder) => { return {
        findGoals: builder.query({
            query: () => ''
        }),
        findActiveGoals: builder.query({
            query: () => '/active'
        }),
        findInactiveGoals: builder.query({
            query: () => '/inactive'
        }),
        findGoalById: builder.query({
            query: (id) => `/${id}`
        }),
        createGoal: builder.mutation({
            query: (goal) => { return {
                method: 'POST',
                body: goal
            }}
        }),
        updateGoal: builder.mutation({
            query: (goal) => { return {
                method: 'PUT',
                url: `/${goal.id}`,
                body: goal
            }}
        }),
        deleteGoal: builder.mutation({
            query: (id) => { return {
                method: 'DELETE',
                url: `/${id}`,
            }}
        })
    }}
})

export const {
  useFindGoalsQuery,
  useFindActiveGoalsQuery,
  useFindInactiveGoalsQuery,
  useFindGoalByIdQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation
} = goalApi;