// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { fetchUserThunk, ban, unBan } from '../../features/login/userSlice'
// import type { RootState, AppDispatch } from '../../store'
// import { User } from '../../type'
// import AdminNav from '../admin/AdminNav'

// //mui
// import { Button } from '@mui/material'
// import Grid from '@mui/material/Grid'

// const UsersList = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const { users, isBanned } = useSelector((state: RootState) => state.auth)

//   //only users, not admin
//   //filtering admin from userList
//   const notAdmin = users.filter((item) => !item.isAdmin)
//   //console.log('notAdmin:', notAdmin)

//   const banUser = (user: User) => {
//     dispatch(ban(user))
//   }
//   const unBanUser = (user: User) => {
//     dispatch(unBan(user))
//   }

//   useEffect(() => {
//     dispatch(fetchUserThunk())
//   }, [])
//   return (
//     <div>
//       <Grid
//         container
//         rowSpacing={1}
//         columnSpacing={{ xs: 1, sm: 0, md: 0 }}
//         className="main-container">
//         <Grid item xs={3}>
//           <AdminNav />
//         </Grid>
//         <Grid item xs={9} className="pl-24">
//           <h2>Registered Users</h2>
//           <ul>
//             {notAdmin.map((user) => (
//               <li key={user.email}>
//                 {user.firstName} {user.lastName}
//                 <Button size="small" onClick={() => banUser(user)}>
//                   Ban
//                 </Button>
//               </li>
//             ))}
//           </ul>
//           <h2>Banned Users</h2>
//           <ul>
//             {isBanned.map((user) => (
//               <li key={user.email}>
//                 {user.firstName} {user.lastName}
//                 <Button size="small" onClick={() => unBanUser(user)}>
//                   UnBan
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         </Grid>
//       </Grid>
//     </div>
//   )
// }

// export default UsersList
