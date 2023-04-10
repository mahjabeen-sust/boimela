import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState, AppDispatch } from '../../store'
import { logout } from '../../features/login/userSlice'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function LoginControl() {
  const loggedInUser = useSelector((state: RootState) => state.auth.loggedInUser)
  //console.log('inside login control:', loggedInUser)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BoiMela{loggedInUser?.isAdmin ? ' :: Welcome Admin' : ''}
            </Typography>

            {/* <Button color="inherit">Login</Button> */}
            {loggedInUser !== null ? (
              <>
                <span className="pr-24">{loggedInUser?.firstName}</span>
                <Link to="/logout">
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(logout())
                    }}>
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default LoginControl
