import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

import type { RootState } from '../store'

const AdminRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (user.role === 'USER') {
    return (
      <div className="unauthorized">
        <h1>Unauthorized</h1>
        <span>
          <NavLink to="/dashboard">Go to User DashBoard</NavLink>
        </span>
      </div>
    )
  }
  return <Outlet />
}

export default AdminRoutes
