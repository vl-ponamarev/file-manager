import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { AppBar, Avatar, Box, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import Logout from 'entities/logout/Logout'
import { UserContext } from 'index'
import iconImage from 'assets/favicon_io/favicon-32x32.png'

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontFamily: 'Monospace',
  fontSize: 30,
  marginLeft: 10,
}

const NavBar = observer(() => {
  const { userStore } = useContext(UserContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            maxWidth: 1000,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex' }}>
            <Avatar alt="icon" src={iconImage} />
            <NavLink to="/main" style={linkStyle}>
              Family File Store
            </NavLink>
          </div>
          {userStore.isAuth && <Logout />}
        </Toolbar>
      </AppBar>
    </Box>
  )
})

export default NavBar
