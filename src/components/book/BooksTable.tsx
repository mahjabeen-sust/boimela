import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '@mui/material/Table'
import { Button } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Grid from '@mui/material/Grid'

import AdminNav from '../admin/AdminNav'
import type { RootState, AppDispatch } from '../../store'
import { fetchBooksThunk, deleteBook } from '../../features/books/booksSlice'
import EditBookForm from './EditBookForm'

const BooksTable = () => {
  const { books } = useSelector((state: RootState) => state)
  const [updateBookIsbn, setUpdateBookIsbn] = useState<null | string>()

  //console.log('received book', book)

  const dispatch = useDispatch<AppDispatch>()

  //console.log('before handle edit', books.items)

  const bookToBeUpdated = books.items.find((book) => {
    if (book.isbn === updateBookIsbn) return book
  })

  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [])

  const handleEdit = (isbn: string) => {
    //alert(isbn)
    setUpdateBookIsbn(isbn)
  }

  return (
    <React.Fragment>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 0, md: 0 }}
        className="main-container">
        <Grid item xs={3}>
          <AdminNav />
        </Grid>
        {books.isLoading ? <span>Loading .... </span> : ''}
        <Grid item xs={9} className="pl-24">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Authors</TableCell>
                <TableCell>Publisher</TableCell>
                <TableCell>Publish Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.items.map((book) => (
                <TableRow key={book.isbn}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.authors}</TableCell>
                  <TableCell>{book.publisher}</TableCell>
                  <TableCell>{book.publishDate}</TableCell>
                  <TableCell>{book.status ? 'Available' : 'Borrowed'}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEdit(book.isbn)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(deleteBook(book.isbn))
                      }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {bookToBeUpdated && <EditBookForm {...bookToBeUpdated} />}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default BooksTable
