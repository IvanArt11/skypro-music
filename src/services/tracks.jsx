import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenLocalStorage } from '../localStorage'

const API_URL =
  process.env.REACT_APP_API_URL ||
  'https://skypro-music-api.skyeng.tech/catalog/'
const DATA_TAG = {
  type: 'Track',
  id: 'LIST',
}

const getHeaders = () => ({
  Authorization: `Bearer ${getTokenLocalStorage()}`,
})

export const apiTracks = createApi({
  reducerPath: 'apiTracks',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getAllTracks: builder.query({
      query: () => 'track/all/',
      providesTags: [DATA_TAG],
    }),
    getFavoritesPlaylist: builder.query({
      query: () => ({
        method: 'GET',
        url: 'track/favorite/all/',
        headers: getHeaders(),
      }),
      providesTags: [DATA_TAG],
    }),
    addToFavorites: builder.mutation({
      query: (id) => ({
        method: 'POST',
        url: `track/${id}/favorite/`,
        headers: getHeaders(),
      }),
      invalidatesTags: [DATA_TAG],
    }),
    deleteFromFavorites: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `track/${id}/favorite/`,
        headers: getHeaders(),
      }),
      invalidatesTags: [DATA_TAG],
    }),
    getSelection: builder.query({
      query: () => 'selection/',
    }),
    getSelectionById: builder.query({
      query: (id) => ({
        method: 'GET',
        url: `selection/${id}/`,
      }),
    }),
  }),
  providesTags: [DATA_TAG],
  tagTypes: ['Track'],
})

export const {
  useGetAllTracksQuery,
  useGetFavoritesPlaylistQuery,
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
  useGetSelectionQuery,
  useGetSelectionByIdQuery,
} = apiTracks
