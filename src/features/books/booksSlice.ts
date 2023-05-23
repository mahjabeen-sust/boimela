import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { Book, BookDTO, User } from '../../type'

export interface BookState {
  items: Book[]
  isLoading: boolean
  error: string | null
  status: string | null
}

const initialState: BookState = {
  items: [],
  isLoading: false,
  error: null,
  status: null
}

//const BOOKS_PLACEHOLDER_API = 'http://localhost:3000/books-small.json'
// const BOOKS_PLACEHOLDER_API = 'https://github.com/mahjabeen-sust/boimela/books-small.json'
const BOOKS_PLACEHOLDER_API = 'https://boimela.netlify.app/books-small.json'

//ACTION

export const fetchBooksThunk = createAsyncThunk('books/fetch', async (data, thunkApi) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/books/')
    const data: Book[] = await response.data
    //console.log('Found books', data)
    return data
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message)
  }
})

//add new book thunk
export const addNewBookThunk = createAsyncThunk('books/add', async (book: BookDTO) => {
  //console.log(author)
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  }

  // Make the Axios request
  const response = await axios
    .post('http://localhost:8080/api/v1/books/', book, {
      headers
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log('error.response.data > ', error.response.data)
        // console.log('error.response.status > ', error.response.status)
        // console.log('error.response.headers > ', error.response.headers)

        return {
          status: error.response.status,
          data: error.response.data
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('error.request > ', error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log('error.config', error.config)
    })
  //console.log('response', response)
  return {
    status: response?.status,
    data: response?.data
  }
})

//SLICE
export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<Book>) => {
      console.log('inside addNewBook reducer: action payload > ', action.payload)

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
    //addBook
    //adding authors reducers
    builder.addCase(addNewBookThunk.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(addNewBookThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = action.payload
      //state.error = 'Something went wrong ...'
    })
    builder.addCase(addNewBookThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload?.status == 200) {
        state.items = [action.payload.data, ...state.items]
        state.error = null
      } else {
        state.error = action.payload?.data
      }
      state.status = action.payload?.status

      //console.log('inside addnewauthorThunk reducer>payload: ', action.payload)
    })
  }
})

export const { addNewBook, deleteBook, editBook } = booksSlice.actions
export default booksSlice.reducer
