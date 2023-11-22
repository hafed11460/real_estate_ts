
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "features/AxiosBaseQuery";

export const toolsApi = createApi({
    reducerPath: 'toolsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['tools'],
    endpoints: (builder) => ({       
        getCities: builder.query({
            query: (body) => {
                return {
                    url: `/cities/`,
                    method: 'GET',
                    data: {},
                };
            },
        }),       
    })
})

export const {
    useGetCitiesQuery,   
} = toolsApi
