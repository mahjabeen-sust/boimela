import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { getDecodedTokenFromStorage } from '../../utils/token'

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserState {
  user: User
  isLoading: boolean
  error: string | null
}
export type DecodedUser = {
  user_id: string
  username: string
  role: Role
}

export type User = {
  id: string | null
  username: string | null
  role: Role | null
}

const initialState: UserState = {
  user: { id: null, username: null, role: null },
  isLoading: false,
  error: null
}

export const signUpThunk = createAsyncThunk(
  'user/signup',
  async (user: { username: string; password: string }) => {
    console.log(user)
    const res = await axios.post('http://localhost:8080/api/v1/signup', user)

    console.log('res', res)
    return res.data
  }
)
export const signInThunk = createAsyncThunk(
  'auth/signin',
  async (user: { username: string; password: string }) => {
    const res = await axios.post('http://localhost:8080/signin', user)
    console.log('token', res.data)
    return {
      token: res.data
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const user = getDecodedTokenFromStorage()
      if (user) {
        state.user = user
      }
    },
    logout: (state) => {
      localStorage.clear()
      const user: User = {
        username: null,
        id: null,
        role: null
      }
      state.user = user

      console.log('inside logout reducer>state.loggedInUser: ', state.user.username)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      console.log(action)
      state.user = action.payload
    })

    builder.addCase(signInThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
    })

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      const token = action.payload.token
      const decodedUser = jwt_decode(token) as DecodedUser
      //console.log('Decoded user : ', decodedUser)
      localStorage.setItem('token', token)

      const user: User = {
        username: decodedUser.username,
        id: decodedUser.user_id,
        role: decodedUser.role
      }
      state.user = user
    })
    builder.addCase(signInThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})
export const { loadUserFromStorage, logout } = authSlice.actions

export default authSlice.reducer
