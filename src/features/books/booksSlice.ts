import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Book, User } from '../../type'

export interface BookState {
  items: Book[]
  isLoading: boolean
  error: string | null
}

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: null
}

//const BOOKS_PLACEHOLDER_API = 'http://localhost:3000/books-small.json'
const BOOKS_PLACEHOLDER_API =
  'http://https://github.com/mahjabeen-sust/boimela/tree/toolkit-mui/public/books-small.json'

//ACTION

export const fetchBooksThunk = createAsyncThunk('books/fetch', async (data, thunkApi) => {
  try {
    const response = await fetch(BOOKS_PLACEHOLDER_API)
    const data: Book[] = await response.json()
    //console.log('Found books', data)
    return data
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message)
  }
})

//SLICE
export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<Book>) => {
      //state.items.concat(action.payload) //not wokring

      state.items = [action.payload, ...state.items]
      //console.log('inside addnewbook reducer>state.items: ', state.items)
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      //console.log('action.payload =', action.payload) // returns correct id
      state.items = state.items.filter((prev) => prev.isbn !== action.payload)
    },
    editBook: (state, action: PayloadAction<Book>) => {
      //console.log('action payload', action.payload)
      state.items = state.items.map((item) => {
        if (item.isbn === action.payload.isbn) {
          return action.payload
        }
        return item
        //item updated successfully but state not
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchBooksThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      //state.error = action.payload
      state.error = 'Something went wrong ...'
    })
    builder.addCase(fetchBooksThunk.fulfilled, (state, action: PayloadAction<Book[]>) => {
      state.isLoading = false
      state.items = action.payload
    })
  }
})

export const { addNewBook, deleteBook, editBook } = booksSlice.actions
export default booksSlice.reducer
