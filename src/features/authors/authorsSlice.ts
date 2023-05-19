import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

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

export const fetchAuthorsThunk = createAsyncThunk('authors/fetch', async () => {
  const token = localStorage.getItem('token')

  let config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.get('http://localhost:8080/api/v1/authors/', config)
  const data: Author[] = await response.data
  //console.log('Found authors', data)
  return data
})

export const addNewAuthorThunk = createAsyncThunk(
  'authors/add',
  async (author: { name: string }) => {
    //console.log(author)
    const token = localStorage.getItem('token')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }

    // Make the Axios request
    const response = await axios
      .post('http://localhost:8080/api/v1/authors/', author, {
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
  }
)

//edit author thunk
export const editAuthorThunk = createAsyncThunk(
  'authors/edit',
  async (author: { id: number; name: string }) => {
    const token = localStorage.getItem('token')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }

    // Make the Axios request
    const response = await axios
      .put(`http://localhost:8080/api/v1/authors/${author.id}`, author, {
        headers
      })
      .catch(function (error) {
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data
          }
        } else if (error.request) {
          console.log('error.request > ', error.request)
        } else {
          console.log('Error', error.message)
        }
        console.log('error.config', error.config)
      })
    //console.log('response', response)
    return {
      status: response?.status,
      data: response?.data
    }
  }
)

//edit author thunk
export const deleteAuthorThunk = createAsyncThunk('authors/delete', async (id: number) => {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  }

  // Make the Axios request
  const response = await axios
    .delete(`http://localhost:8080/api/v1/authors/${id}`, {
      headers
    })
    .catch(function (error) {
      if (error.response) {
        return {
          status: error.response.status,
          data: error.response.data
        }
      } else if (error.request) {
        console.log('error.request > ', error.request)
      } else {
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
export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    deleteAuthor: (state, action: PayloadAction<number>) => {
      //console.log('action.payload =', action.payload) // returns correct id
      state.items = state.items.filter((prev) => prev.id !== action.payload)
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

    //adding authors reducers
    builder.addCase(addNewAuthorThunk.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(addNewAuthorThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = action.payload
      //state.error = 'Something went wrong ...'
    })
    builder.addCase(addNewAuthorThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload?.status == 200) {
        state.items = [action.payload.data, ...state.items]
        state.error = null
      } else {
        state.error = action.payload?.data
      }

      //console.log('inside addnewauthorThunk reducer>payload: ', action.payload)
    })

    //edit author thunk reducers
    builder.addCase(editAuthorThunk.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(editAuthorThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = action.payload.data
    })
    builder.addCase(editAuthorThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload?.status == 200) {
        state.error = null
        state.items = state.items.map((item) => {
          if (item.id === action.payload.data.id) {
            return action.payload.data
          }

          return item
        })
      } else {
        state.error = action.payload?.data
      }
    })

    //delet author thunk reducers
    builder.addCase(deleteAuthorThunk.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(deleteAuthorThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = action.payload.data
    })
    builder.addCase(deleteAuthorThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload?.status == 200) {
        state.error = null
        state.items = state.items.filter((prev) => prev.id !== action.payload.data.id)
      } else {
        state.error = action.payload?.data
      }
    })
  }
})

export const { deleteAuthor } = authorsSlice.actions
export default authorsSlice.reducer
