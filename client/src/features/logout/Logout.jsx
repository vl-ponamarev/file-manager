import React, { useContext } from 'react'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite'
import { Button, styled } from '@mui/material'
import { blue } from '@mui/material/colors'

function Logout() {
  const { userStore } = useContext(UserContext)

  const logoutHandler = () => {
    userStore.logout()
    window.location.replace('/login')
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  }))

  return (
    <ColorButton onClick={() => logoutHandler()} type="button">
      Выйти
    </ColorButton>
  )
}

export default observer(Logout)
