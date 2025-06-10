import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'

export const friendApi = createApi({
    reducerPath: 'friendApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/'}),
    endpoints: (builder) => ({
        getFriends: builder.query({
            query: () => 'friend'
        }),
        friendCheck: builder.query({
            query: (friendId) => `friend?friendId=${friendId}`
        }),
        addFriend: builder.mutation({
            query: (data) => ({
                url: 'friend',
                method: 'POST',
                body: data
            })
        }),
        deleteFriend: builder.mutation({
            query: (friendId) => ({
                url: `friend/?friendId=${friendId}`,
                method: 'DELETE'
            })
        }),
    })
})

export const { useGetFriendsQuery,useAddFriendMutation,useDeleteFriendMutation,useFriendCheckQuery } = friendApi