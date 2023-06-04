import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import type { AppDispatch } from './store'
import { loadUserFromStorage } from './features/login/authSlice'
import SignIn from './components/shared/SignIn'
import Dashboard from './components/user/Dashboard'
import ProtectedRoute from './routing/ProtectedRoute'
import LoginControl from './components/shared/LoginControl'
import AdminDashboard from './components/admin/AdminDashboard'
import BookForm from './components/book/BookForm'
import AuthorForm from './components/author/AuthorForm'
import EditAuthor from './components/author/EditAuthor'
import CategoryForm from './components/category/CategoryForm'
import EditCategory from './components/category/EditCategory'

import Books from './components/book/Books'
import BooksTable from './components/book/BooksTable'
import Borrowed from './components/user/Borrowed'
import SignUp from './components/shared/SignUp'
import Loans from './components/admin/Loans'

/**
 * https://stackoverflow.com/questions/71885505/react-router-v6-no-routes-matched-location
 */

const Home = () => <Books />
const Logout = () => (
  <ul>
    <li>You have successfully logged out!</li>
  </ul>
)

const Header = ({ children }: any) => children
const Wrapper = ({ children }: any) => children

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header>
          {/* <NavBar /> */}
          <LoginControl />
        </Header>
        <div>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/logout" element={<Logout />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/borrowedBooks" element={<Borrowed />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/addBook" element={<BookForm />} />

                <Route path="/updateBook" element={<BooksTable />} />
                <Route path="/addAuthor" element={<AuthorForm />} />
                <Route path="/updateAuthor" element={<EditAuthor />} />
                <Route path="/addCategory" element={<CategoryForm />} />
                <Route path="/updateCategory" element={<EditCategory />} />
                <Route path="/allLoans" element={<Loans />} />
              </Route>
            </Routes>
          </Wrapper>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
