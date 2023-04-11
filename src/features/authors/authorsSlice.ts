import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Author } from '../../type'

export interface authorState {
  items: Author[]
  isLoading: boolean
  error: string | null
}

const initialState: authorState = {
  items: [],
  isLoading: false,
  error: null
}

//const AUTHORS_PLACEHOLDER_API = 'http://localhost:3000/authors.json'
const AUTHORS_PLACEHOLDER_API = 'https://boimela.netlify.app/authors.json'

// axios.defaults.baseURL = process.env.REACT_APP_BACKENDURL || 'https://pmapi.bluewindlab.com'
//
//ACTION

export const fetchAuthorsThunk = createAsyncThunk('authors/fetch', async (data, thunkApi) => {
  try {
    const response = await fetch(AUTHORS_PLACEHOLDER_API)
    const data: Author[] = await response.json()
    //console.log('Found authors', data)
    return data
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message)
  }
})

//SLICE
export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addNewAuthor: (state, action: PayloadAction<Author>) => {
      //state.items.concat(action.payload) //not wokring

      state.items = [action.payload, ...state.items]
      console.log('inside addnewauthor reducer>state.items: ', state.items)
    },
    deleteAuthor: (state, action: PayloadAction<number>) => {
      //console.log('action.payload =', action.payload) // returns correct id
      state.items = state.items.filter((prev) => prev.id !== action.payload)
    },
    editAuthor: (state, action: PayloadAction<Author>) => {
      //console.log('action payload', action.payload)
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload
        }

        return item
        //item updated successfully but state not
      })
      //;`enter code here`
      //console.log('updated authors', state.items)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchAuthorsThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      //state.error = action.payload
      state.error = 'Something went wrong ...'
    })
    builder.addCase(fetchAuthorsThunk.fulfilled, (state, action: PayloadAction<Author[]>) => {
      state.isLoading = false
      state.items = action.payload
    })
  }
})

export const { addNewAuthor, deleteAuthor, editAuthor } = authorsSlice.actions
export default authorsSlice.reducer
