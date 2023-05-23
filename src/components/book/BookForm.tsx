import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'

import 'react-datepicker/dist/react-datepicker.css'

import AdminNav from '../admin/AdminNav'
import type { AppDispatch, RootState } from '../../store'
import { fetchBooksThunk, addNewBookThunk } from '../../features/books/booksSlice'
import { fetchAuthorsThunk } from '../../features/authors/authorsSlice'
import { fetchCategoryThunk } from '../../features/category/categorySlice'
import Books from './Books'

//mui
import { TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material'
import { Preview } from '@mui/icons-material'
import { date } from 'zod'

const BookForm = () => {
  const { books } = useSelector((state: RootState) => state)
  const { authors } = useSelector((state: RootState) => state)
  const { categories } = useSelector((state: RootState) => state)

  // var oldString = 'mystring'
  // var mynewarray = oldString.split('\0')
  // console.log('My New Array Output is', mynewarray)

  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    description: '',
    publishers: '',
    categoryId: '',
    authorIdList: [''],
    status: 'AVAILABLE',
    publishedDate: new Date().toISOString().slice(0, 7).replace('/-/gi', '/')
  })

  const dispatch = useDispatch<AppDispatch>()

  const [checkboxes, setCheckboxes] = useState<any[]>([])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    if (checked) {
      // Add the value to the array
      setCheckboxes((checkboxes) => [...checkboxes, value])
    } else {
      // Remove the value from the array
      setCheckboxes((checkboxes) => checkboxes.filter((item) => item !== value))
    }
    //console.log('checkbox added > ', checkboxes)
  }

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
      //adding the ckeboxes to authorIdList
      newBook.authorIdList = checkboxes
      //console.log('newbook: ', newBook)
      dispatch(addNewBookThunk(newBook))

      //;<Link to="/adminDashboard">Go back to dashboard</Link>
    }
  }

  //from mui example
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  useEffect(() => {
    dispatch(fetchBooksThunk())
    dispatch(fetchAuthorsThunk())
    dispatch(fetchCategoryThunk())
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
          {/* <Books /> */}

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
              label="Publishers"
              name="publishers"
              onChange={handleChange}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={newBook.publishers}
              //error={titleError}
            />

            <InputLabel id="category-add-label">Category</InputLabel>
            <Select
              label="Category"
              name="categoryId"
              value={newBook.categoryId}
              required
              //onChange={handleChange} //this works
              onChange={(event) => handleChange(event as any)}>
              {categories.items.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>

            <InputLabel id="author-add-label">Authors</InputLabel>

            {authors.items.map((author) => (
              <div>
                <input
                  type="checkbox"
                  value={author.id}
                  checked={checkboxes.includes(author.id.toString())}
                  onChange={handleCheckboxChange}
                />
                {author.name}
              </div>
            ))}
            {/* <div>Selected options: {checkboxes.join(', ')}</div> */}

            <InputLabel id="status-add-label">Status</InputLabel>
            <Select
              sx={{ mt: 2, mb: 2 }}
              label="Status"
              name="status"
              required
              value={newBook.status}
              //onChange={handleChange} //this works
              onChange={(event) => handleChange(event as any)}>
              <MenuItem value="AVAILABLE" selected>
                AVAILABLE
              </MenuItem>
              <MenuItem value="BORROWED">BORROWED</MenuItem>
            </Select>

            <TextField
              type="date"
              name="publishedDate"
              id="publishedDate"
              variant="outlined"
              color="secondary"
              label="Publish Date"
              onChange={handleChange}
              value={newBook.publishedDate}
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
            {books.error ? <span className="error">{books.error}</span> : ''}
            {books.status == '200' ? <span className="success">Book added Succesfully!</span> : ''}
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default BookForm
