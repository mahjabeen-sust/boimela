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
import { fetchBooksThunk } from '../../features/books/booksSlice'
import { object, string } from 'zod'

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center'
}))

const Books = () => {
  const { books } = useSelector((state: RootState) => state)
  //console.log('length of book object', books.items.length)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      {books.isLoading ? <span>Loading .... </span> : ''}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* {Array.from(Array(50)).map((_, index) => ( */}
        {books.items.map((book) => (
          <Grid xs={2} sm={4} key={book.isbn}>
            <Card sx={{ maxWidth: 345, p: 0, minHeight: 200 }} key={book.isbn}>
              <CardMedia
                sx={{ height: 100 }}
                image="/assets/images/book-image.jpg"
                title={book.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h4">
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Books
