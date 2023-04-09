import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminNav from '../admin/AdminNav'
import type { RootState, AppDispatch } from '../../store'
import { fetchBooksThunk, deleteBook } from '../../features/books/booksSlice'

//mui
import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import styled from '@mui/system/styled'
import EditBookForm from './EditBookForm'
import Grid from '@mui/material/Grid'

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center'
}))

const EditBook = () => {
  const { books } = useSelector((state: RootState) => state)
  const [updateBookIsbn, setUpdateBookIsbn] = useState<null | string>()

  //console.log('received book', book)

  const dispatch = useDispatch<AppDispatch>()

  //console.log('before handle edit', books.items)

  const bookToBeUpdated = books.items.find((book) => {
    if (book.isbn === updateBookIsbn) return book
  })
  console.log('bookToBeUpdated', bookToBeUpdated)

  //handle edit
  const handleEdit = (isbn: string) => {
    //alert(isbn)
    setUpdateBookIsbn(isbn)
  }
  //console.log('set isbn, ', updateBookIsbn)

  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [])

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
        <Grid item xs={9} className="pl-24">
          {/* books */}

          <Box sx={{ flexGrow: 1 }}>
            {books.isLoading ? <span>Loading .... </span> : ''}
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {/* {Array.from(Array(50)).map((_, index) => ( */}
              {books.items.map((book) => (
                <Grid xs={2} sm={4} key={book.isbn}>
                  <Card sx={{ maxWidth: 345, p: 2, minHeight: 200 }}>
                    <CardMedia
                      sx={{ height: 100 }}
                      image="/assets/images/book-image.jpg"
                      title={book.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        By - {book.authors}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Publisher :{book.publisher}
                      </Typography>
                      <Typography gutterBottom component="span">
                        {book.status ? 'Available' : 'Borrowed'}
                      </Typography>
                    </CardContent>

                    {/* edit, delete button for admin */}
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleEdit(book.isbn)}>
                        Edit
                      </Button>
                    </CardActions>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          dispatch(deleteBook(book.isbn))
                        }}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                  {/* {edit && <EditBookForm {...book} />} */}
                </Grid>
              ))}
            </Grid>
          </Box>

          {bookToBeUpdated && <EditBookForm {...bookToBeUpdated} />}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default EditBook
