import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminNav from '../admin/AdminNav'
import type { RootState, AppDispatch } from '../../store'
import { fetchAuthorsThunk, addNewAuthor } from '../../features/authors/authorsSlice'

//mui
import { TextField, Button } from '@mui/material'
import Grid from '@mui/material/Grid'

export default function AuthorForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { authors } = useSelector((state: RootState) => state)
  //console.log('author object length', Object.keys(authors.items).length)

  const [newAuthor, setNewAuthor] = useState({
    id: Object.keys(authors.items).length + 1,
    authorName: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let name = e.target.name
    setNewAuthor((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    //from mui example
    setNameError(false)

    if (newAuthor.authorName == '') {
      setNameError(true)
    }

    if (newAuthor.authorName) {
      dispatch(addNewAuthor(newAuthor))
      //;<Link to="/adminDashboard">Go back to dashboard</Link>
    }
  }
  const [nameError, setNameError] = useState(false)

  useEffect(() => {
    dispatch(fetchAuthorsThunk())
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
          <ul className="author-list">
            {authors.items.map((author) => (
              <li key={author.id}>{author.authorName}</li>
            ))}
          </ul>

          {/* author add form */}
          <form action="" className="AuthorForm" onSubmit={handleSubmit}>
            <h2>Add New Author</h2>

            <TextField
              label="Name"
              name="authorName"
              onChange={handleChange}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={newAuthor.authorName}
              //error={nameError}
            />
            <Button variant="outlined" color="secondary" type="submit">
              Add
            </Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
