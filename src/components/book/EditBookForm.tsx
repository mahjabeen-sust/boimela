import React, { useState, ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '../../store'
import { editBook } from '../../features/books/booksSlice'
import { Book } from '../../type'
import { fetchAuthorsThunk } from '../../features/authors/authorsSlice'

//mui
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material'

import styled from '@mui/system/styled'

function formatTheDate(dateString: string) {
  if (typeof dateString == 'undefined' || dateString == null) return '0000-00-00'
  // console.log(dateString)
  // return dateString
  var r_date = dateString.split('/')
  var mod_date =
    r_date[2] + '-' + (r_date[0].length === 1 ? 0 + r_date[0] : r_date[0]) + '-' + r_date[1]
  console.log('Mod ' + mod_date)

  return mod_date
}

function EditBookForm(props: Book) {
  //console.log('received book', props)
  const { authors } = useSelector((state: RootState) => state)

  const dispatch = useDispatch<AppDispatch>()

  //setting values for book
  const [newBook, setNewBook] = useState({
    isbn: props.isbn,
    title: props.title,
    description: props.description,
    publisher: props.publisher,
    authors: props.authors,
    status: props.status,
    borrowerId: props.borrowerId,
    //publishDate: props.publishDate,
    publishDate: formatTheDate(props.publishDate),
    borrowDate: props.borrowDate,
    returnDate: props.returnDate
  })

  if (newBook.isbn !== props.isbn) {
    setNewBook((prev) => ({
      ...prev,
      isbn: props.isbn,
      title: props.title,
      description: props.description,
      publisher: props.publisher,
      authors: props.authors,
      status: props.status,
      borrowerId: props.borrowerId,
      //publishDate: props.publishDate,
      publishDate: formatTheDate(props.publishDate),
      borrowDate: props.borrowDate,
      returnDate: props.returnDate
    }))
  }

  console.log('newBook: ', newBook)

  // R:8/17/2022
  // Req: 2023-08-10
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
      dispatch(editBook(newBook))
    }

    //console.log('after handle edit', books.items)
  }

  //from mui example
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  return (
    <React.Fragment>
      <form action="" className="bookForm" onSubmit={handleSubmit}>
        <h2>Edit Book Form</h2>

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
        <InputLabel id="author-edit-label">Authors</InputLabel>
        <Select
          label="Authors"
          name="authors"
          value={newBook.authors}
          required
          labelId="author-edit-label"
          id="author-edit-select"
          onChange={handleChange}>
          <MenuItem value={newBook.authors} selected>
            {newBook.authors}
          </MenuItem>
          {authors.items.map((author) => (
            <MenuItem value={author.authorName}>{author.authorName}</MenuItem>
          ))}
          {/* <MenuItem value="author1">Author1</MenuItem>
          <MenuItem value="author2">Author2</MenuItem>
          <MenuItem value="author3">Author3</MenuItem> */}
        </Select>

        <InputLabel id="status-edit-label">Status</InputLabel>
        <Select
          label="Status"
          name="status"
          required
          labelId="status-edit-label"
          id="status-edit-select"
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
          id="publish-date-edit"
          variant="outlined"
          color="secondary"
          label="Publish Date"
          onChange={handleChange}
          value={newBook.publishDate}
          // value="2023-08-10"
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        {/* <TextField
          type="date"
          name="borrowDate"
          id="borrow-date-edit"
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
          id="return-date-edit"
          variant="outlined"
          color="secondary"
          label="Return Date"
          onChange={handleChange}
          value={newBook.returnDate}
          fullWidth
          sx={{ mb: 4 }}
        /> */}

        {/* more inputs to be loaded.... */}
        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </React.Fragment>
  )
}

export default EditBookForm
