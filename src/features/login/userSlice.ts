import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../type'

export interface UserState {
  users: User[]
  loggedInUser: User | null
  isLoading: boolean
  error: string | null
  isBanned: User[]
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  isLoading: false,
  error: null,
  isBanned: []
}
//const USERS_PLACEHOLDER_API = 'http://localhost:3000/users.json'
const USERS_PLACEHOLDER_API =
  'https://github.com/mahjabeen-sust/boimela/tree/toolkit-mui/public/users.json'

//may be work on later
//const backendURl = 'http://localhost:3000'
// export const userLogin = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }: User, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//       const { data } = await axios.post(`${backendURl}/login`, { email, password }, config)

//       //store user's email in local storage
//       localStorage.setItem('loggedInUser', data.email)
//     } catch (error: any) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

export const fetchUserThunk = createAsyncThunk('users/fetch', async (data, thunkApi) => {
  try {
    const response = await fetch(USERS_PLACEHOLDER_API)
    const data: User[] = await response.json()
    //console.log('Found users', data)

    return data
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message)
  }
})

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.loggedInUser = action.payload
      //console.log('inside login reducer>state.loggedInUser: ', state.loggedInUser)
    },
    logout: (state) => {
      state.loggedInUser = null
      //console.log('inside logout reducer>state.loggedInUser: ', state.loggedInUser)
    },
    ban: (state, action: PayloadAction<User>) => {
      //adding to isBanned
      state.isBanned = [action.payload, ...state.isBanned]
      //deleting from users
      state.users = state.users.filter((prev) => prev.email !== action.payload.email)
    },
    unBan: (state, action: PayloadAction<User>) => {
      //console.log('action.payload =', action.payload) // returns correct id
      //deleting from isBanned
      state.isBanned = state.isBanned.filter((prev) => prev.email !== action.payload.email)
      //adding to user
      state.users = [action.payload, ...state.users]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
    })

    builder.addCase(fetchUserThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.isLoading = false
      state.users = action.payload
    })

    builder.addCase(fetchUserThunk.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const { login, logout, ban, unBan } = userSlice.actions

export default userSlice.reducer
