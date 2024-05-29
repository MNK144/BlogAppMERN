import { createSlice } from "@reduxjs/toolkit"

/*
BlogEntry:
  id: string
  title: string
  description: string
  category: string
  slug: string
  date: string
*/

const initialState = {
  // [slug]: BlogEntry
};

const slice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlogData(state, action) {
      return (state = {
        ...state,
        [action.payload.slug]: action.payload
      })
    },
    removeBlogData(state, action) {
      return (state = {
        ...state,
        [action.payload.slug]: undefined
      })
    },
    resetBlogData(state) {
      return (state = {
        ...initialState
      })
    },
  }
});

export const { reducer } = slice;

export const {
  addBlogData,
  removeBlogData,
  resetBlogData
} = slice.actions

export const getBlog = (slug) => (state) => state.blog[slug];