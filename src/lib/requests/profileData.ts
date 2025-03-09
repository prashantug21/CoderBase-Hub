import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'

export const handlesApi = createApi({
    reducerPath: 'handlesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'api/'}),
    endpoints: (builder) => ({
        getHandles: builder.query({
            query: () => 'handles'
        }),
        updateHandles: builder.mutation({
            query: (data) => ({
                url: 'handles',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useGetHandlesQuery, useUpdateHandlesMutation } = handlesApi