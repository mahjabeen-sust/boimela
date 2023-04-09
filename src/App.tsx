import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Login from './components/shared/Login'
import Dashboard from './components/user/Dashboard'
import ProtectedRoute from './routing/ProtectedRoute'
import LoginControl from './components/shared/LoginControl'
import AdminDashboard from './components/admin/AdminDashboard'
import BookForm from './components/book/BookForm'
import EditBook from './components/book/EditBook'
import AuthorForm from './components/author/AuthorForm'
import EditAuthor from './components/author/EditAuthor'
import UsersList from './components/user/UsersList'
import BorrowedBooks from './components/user/BorrowedBooks'
import Books from './components/book/Books'
import BooksTable from './components/book/BooksTable'

import type { RootState } from './store'

import SignIn from './components/shared/SignIn'

/**
 * https://stackoverflow.com/questions/71885505/react-router-v6-no-routes-matched-location
 */

const Home = () => (
  <>
    <Books />
  </>
)
const Logout = () => (
  <ul>
    <li>You have successfully logged out!</li>
    {/* <li>
      <Link to="/login">Login</Link>
    </li> */}
  </ul>
)

const Header = ({ children }: any) => children
const Wrapper = ({ children }: any) => children

// const NavBar = () => (
//   <ul>
//     <li>
//       <Link to="/login">Login</Link>
//     </li>
//   </ul>
// )

function App() {
  const user = useSelector((state: RootState) => state.auth.loggedInUser)

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
              {/* <Route path="create" element={<Creation user={account} />} /> */}

              <Route path="/login" element={<Login />} />
              {/* <Route path="/login" element={<SignIn />} /> */}
              <Route path="/logout" element={<Logout />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/borrowedBooks" element={<BorrowedBooks />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/addBook" element={<BookForm />} />
                {/* <Route path="/updateBook" element={<EditBook />} /> */}
                <Route path="/updateBook" element={<BooksTable />} />
                <Route path="/addAuthor" element={<AuthorForm />} />
                <Route path="/updateAuthor" element={<EditAuthor />} />
                <Route path="/manageUser" element={<UsersList />} />
              </Route>
            </Routes>
          </Wrapper>
          {/* {!user ? <Books /> : ''} */}
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
