import React, { useContext } from 'react'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite'
import { Button, styled } from '@mui/material'
import { purple } from '@mui/material/colors'

function Logout() {
  const { userStore } = useContext(UserContext)

  const logoutHandler = () => {
    userStore.logout()
    window.location.replace('/')
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }))

  return (
    <ColorButton onClick={() => logoutHandler()} type="button">
      Logout
    </ColorButton>
  )
}

export default observer(Logout)
