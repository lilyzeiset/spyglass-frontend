import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const goalApi = createApi({
  reducerPath: 'goalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URI}/goal`,
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
        uploadImage: builder.mutation({
            query: ( {id, image} ) => {
                const formData = new FormData();
                formData.append('image', image, image.name);
        
                return {
                  url: `/${id}/upload`,
                  method: 'POST',
                  body: formData,
                };
            }
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
  useUploadImageMutation,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation
} = goalApi;