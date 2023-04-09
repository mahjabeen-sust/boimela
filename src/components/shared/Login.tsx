import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate, Navigate } from 'react-router-dom'

import { fetchUserThunk } from '../../features/login/userSlice'
import { login } from '../../features/login/userSlice'
import type { RootState, AppDispatch } from '../../store'
import { isUser } from '../../features/login/userService'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { handleSubmit } = useForm()

  const dispatch = useDispatch<AppDispatch>()
  //checking if user exists
  const payload = isUser({ email, password })
  //console.log('payload from userService', payload)

  useEffect(() => {
    dispatch(fetchUserThunk())
  }, [navigate])

  const logUser = () => {
    //alert('loguser')
    if (payload) {
      dispatch(login(payload))
      if (payload.isAdmin === true) {
        navigate('/adminDashboard')
      } else {
        navigate('/dashboard')
      }
    } else {
      alert('wrong credentials')
    }
  }

  return (
    // <form action="" className="login" onSubmit={handleSubmit(logUser)}>
    //   <div className="form-group">
    //     <label htmlFor="email">Email</label>
    //     <input
    //       placeholder="Email"
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit" className="button">
    //     Login
    //   </button>
    // </form>
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(logUser)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Login
