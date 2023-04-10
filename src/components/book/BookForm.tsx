import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import AdminNav from '../admin/AdminNav'
import type { AppDispatch, RootState } from '../../store'
import { fetchBooksThunk, addNewBook } from '../../features/books/booksSlice'
import { fetchAuthorsThunk } from '../../features/authors/authorsSlice'
import Books from './Books'

//mui
import { TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material'
import { Preview } from '@mui/icons-material'
import { date } from 'zod'

const BookForm = () => {
  const { authors } = useSelector((state: RootState) => state)
  const [startDate, setStartDate] = useState(new Date())

  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    description: '',
    publisher: '',
    authors: '',
    status: true,
    borrowerId: null,
    publishDate: new Date().toISOString().slice(0, 7).replace('/-/gi', '/'),
    borrowDate: null,
    returnDate: null
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
    //console.log('newBook', newBook)
    // return 1
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
    dispatch(fetchAuthorsThunk())
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
          <Books />

          <form action="" className="bookForm" onSubmit={handleSubmit}>
            <h2>Add New Book</h2>

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
              //onChange={handleChange} //this works
              onChange={() => handleChange}>
              {/* <MenuItem value={newBook.authors} selected>
                {newBook.authors}
              </MenuItem> */}
              {authors.items.map((author) => (
                <MenuItem value={author.authorName}>{author.authorName}</MenuItem>
              ))}
              {/* <MenuItem value="author1">Author1</MenuItem>
              <MenuItem value="author2">Author2</MenuItem>
              <MenuItem value="author3">Author3</MenuItem> */}
            </Select>

            <InputLabel id="status-add-label">Status</InputLabel>
            <Select
              sx={{ mt: 2, mb: 2 }}
              label="Status"
              name="status"
              required
              value={newBook.status}
              //onChange={handleChange} //this works
              onChange={() => handleChange}>
              <MenuItem value={newBook.status as any} selected>
                {newBook.status}
              </MenuItem>
              <MenuItem value={true as any}>Available</MenuItem>
              <MenuItem value={false as any}>Borrowed</MenuItem>
            </Select>

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
              sx={{ mb: 4, mt: 4 }}
            />

            {/* <Datepicker
              onChange={(date) => setStartDate(date)}
              //onChange={handleChange(date)}
              selected={startDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            /> */}

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
