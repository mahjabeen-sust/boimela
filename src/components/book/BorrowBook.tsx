import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//mui
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import Grid from '@mui/system/Unstable_Grid'
import styled from '@mui/system/styled'

import type { RootState, AppDispatch } from '../../store'
import { fetchBooksThunk, editBook } from '../../features/books/booksSlice'
import { Book } from '../../type'

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center'
}))

const BorrowBook = () => {
  const { books } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  //check if user is admin
  const loggedInUser = useSelector((state: RootState) => state.auth.loggedInUser)
  

  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [])

  const borrow = (isbn: string) => {
    //console.log('isbn', isbn)

    //find the book to be borrowed
    const bookToBeBorrowed = books.items.find((book) => {
      if (book.isbn === isbn) return book
    })
    //console.log('book to be borrowed:', bookToBeBorrowed)

    const borrowedBook = {
      isbn: bookToBeBorrowed.isbn,
      title: bookToBeBorrowed.title,
      description: bookToBeBorrowed.description,
      publisher: bookToBeBorrowed.publisher,
      authors: bookToBeBorrowed.authors,
      status: false,
      publishDate: bookToBeBorrowed.publishDate,
      borrowerId: loggedInUser.email,
      borrowDate: new Date().toISOString().slice(0, 10).replace('/-/gi', '/'),
      returnDate: null
    }

    //console.log('book to be borrowed:', borrowedBook)
    //dispatch the borrowBook

    dispatch(editBook(borrowedBook))
  }
  

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {books.isLoading ? <span>Loading .... </span> : ''}
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {/* {Array.from(Array(50)).map((_, index) => ( */}
          {books.items.map((book) => (
            <Grid xs={2} sm={4} key={book.isbn}>
              <Card sx={{ maxWidth: 345, p: 0, minHeight: 200 }}>
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
                  <Typography variant="body2" color="text.secondary">
                    Borrowed By - {book.borrowerId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Borrow Date :<span>{book.borrowDate?.toString()}</span>
                  </Typography>
                  <Typography gutterBottom variant="h6" component="span">
                    {book.status ? 'Available' : 'Borrowed'}
                  </Typography>
                </CardContent>
                {/* if user is not admin */}
                <CardActions>
                  {loggedInUser?.isAdmin === false && book.status ? (
                    <Button size="small" type="button" onClick={() => borrow(book.isbn)}>
                      Borrow
                    </Button>
                  ) : (
                    ''
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default BorrowBook
