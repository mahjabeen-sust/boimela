import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import booksReducer from './features/books/booksSlice'
//import userReducer from './features/login/userSlice'
import authReducer from './features/login/authSlice'
import authorReducer from './features/authors/authorsSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    //auth: userReducer,
    auth: authReducer,
    authors: authorReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch
