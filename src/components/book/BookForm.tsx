import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'

import AdminNav from '../admin/AdminNav'
import type { AppDispatch } from '../../store'
import { fetchBooksThunk, addNewBook } from '../../features/books/booksSlice'
import Books from './Books'

//mui
import { TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material'

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    description: '',
    publisher: '',
    authors: 'author1',
    status: true,
    borrowerId: '',
    publishDate: new Date(),
    borrowDate: new Date(),
    returnDate: new Date()
  })

  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let name = e.target.name
    setNewBook((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    //from mui example
    setTitleError(false)
    setDescriptionError(false)

    if (newBook.title == '') {
      setTitleError(true)
    }
    if (newBook.description == '') {
      setDescriptionError(true)
    }

    if (newBook.title && newBook.description) {
      dispatch(addNewBook(newBook))
      //;<Link to="/adminDashboard">Go back to dashboard</Link>
    }
  }

  //from mui example
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

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
        <Grid item xs={3} className="admin-nav-container">
          <AdminNav />
        </Grid>
        <Grid item xs={9} className="pl-24">
          <Books />

          <form action="" className="bookForm" onSubmit={handleSubmit}>
            <h2>Add New Book Form</h2>

            <TextField
              label="ISBN"
              name="isbn"
              onChange={handleChange}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={newBook.isbn}
              //error={titleError}
            />
            <TextField
              label="Title"
              name="title"
              onChange={handleChange}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={newBook.title}
              error={titleError}
            />

            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={newBook.description}
              error={descriptionError}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Publisher"
              name="publisher"
              onChange={handleChange}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={newBook.publisher}
              //error={titleError}
            />
            <InputLabel id="author-add-label">Authors</InputLabel>
            <Select
              label="Authors"
              name="authors"
              value={newBook.authors}
              required
              onChange={handleChange}>
              {/* <MenuItem value={newBook.authors} selected>
                {newBook.authors}
              </MenuItem> */}
              <MenuItem value="author1">Author1</MenuItem>
              <MenuItem value="author2">Author2</MenuItem>
              <MenuItem value="author3">Author3</MenuItem>
            </Select>

            <InputLabel id="status-add-label">Status</InputLabel>
            <Select
              label="Status"
              name="status"
              required
              value={newBook.status}
              onChange={handleChange}>
              <MenuItem value={newBook.status as any} selected>
                {newBook.status}
              </MenuItem>
              <MenuItem value={true as any}>Available</MenuItem>
              <MenuItem value={false as any}>Borrowed</MenuItem>
            </Select>

            <TextField
              label="Borrower Id"
              name="borrowerId"
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={newBook.borrowerId}
              //error={titleError}
            />
            <TextField
              type="date"
              name="publishDate"
              id="publish-date"
              variant="outlined"
              color="secondary"
              label="Publish Date"
              onChange={handleChange}
              value={newBook.publishDate}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="date"
              name="borrowDate"
              id="borrow-date"
              variant="outlined"
              color="secondary"
              label="Borrow Date"
              onChange={handleChange}
              value={newBook.borrowDate}
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="date"
              name="returnDate"
              id="return-date"
              variant="outlined"
              color="secondary"
              label="Return Date"
              onChange={handleChange}
              value={newBook.returnDate}
              fullWidth
              sx={{ mb: 4 }}
            />

            {/* more inputs to be loaded.... */}
            <Button variant="outlined" color="secondary" type="submit">
              Add New Book
            </Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default BookForm
