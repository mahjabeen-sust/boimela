import { useDispatch, useSelector } from 'react-redux'

import type { RootState, AppDispatch } from '../../store'
import { editBook } from '../../features/books/booksSlice'
import UserNav from './UserNav'

import Table from '@mui/material/Table'
import { Button } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Grid from '@mui/material/Grid'

const Borrowed = () => {
  const { books } = useSelector((state: RootState) => state)
  const loggedInUser = useSelector((state: RootState) => state.auth.loggedInUser)
  const dispatch = useDispatch<AppDispatch>()

  const borrowedBook = books.items.filter((item) => item.borrowerId === loggedInUser?.email)

  const returnBook = (isbn: string) => {
    const bookToBeReturned = books.items.find((book) => {
      if (book.isbn === isbn) return book
    })

    //a new object for returning book
    const returnedBook = {
      isbn: bookToBeReturned.isbn,
      title: bookToBeReturned.title,
      description: bookToBeReturned.description,
      publisher: bookToBeReturned.publisher,
      authors: bookToBeReturned.authors,
      borrowerId: null,
      publishDate: bookToBeReturned.publishDate,
      status: true,
      borrowDate: null,
      returnDate: new Date().toISOString().slice(0, 10).replace('/-/gi', '/')
    }

    dispatch(editBook(returnedBook))
  }
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 0, md: 0 }}
      className="main-container">
      <Grid item xs={3}>
        <UserNav />
      </Grid>
      <Grid item xs={9} className="pl-24">
        {borrowedBook && (
          <>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Authors</TableCell>
                  <TableCell>Publisher</TableCell>
                  <TableCell>Borrow Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {borrowedBook.map((book) => (
                  <TableRow key={book.isbn}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.authors}</TableCell>
                    <TableCell>{book.publisher}</TableCell>
                    <TableCell>{book.borrowDate}</TableCell>

                    <TableCell>
                      <Button size="small" type="button" onClick={() => returnBook(book.isbn)}>
                        Return
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default Borrowed
