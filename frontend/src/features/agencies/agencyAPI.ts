import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'features/axiosBaseQuery'


export const agencyAPI = createApi({
  reducerPath: 'agencyAPI',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Agencies'],
  endpoints: (builder) => ({

    getAgency: builder.query({
      query: () => {
        return {
          url: `agencies/settings/`,
          method: 'GET',
          data: {}
        }
      },
      providesTags: (result, error, id) => [{ type: 'Agencies', id }],
    }),
    
    getAgencyList: builder.query({
      query: () => {
        return {
          url: `agencies/`,
          method: 'GET',
          data: {}
        }
      },
      providesTags: (result, error, id) => [{ type: 'Agencies', id }],
    }),
    getAgencyInfo: builder.mutation({
      query: () => {
        return {
          url: `agencies/settings/`,
          method: 'GET',
          data: {}
        }
      },
      providesTags: (result, error, id) => [{ type: 'Agencies', id }],
    }),

    updateAgencyInfo: builder.mutation({
      query: (body) => {
        return {
          url: `agencies/settings/`,
          method: 'PUT',
          data: body
        }
      },
      invalidatesTags: ['Agencies']
    }),
  }),
})

export const {
  useGetAgencyListQuery,
  useGetAgencyQuery,
  useGetAgencyInfoMutation,
  useUpdateAgencyInfoMutation,

} = agencyAPI
