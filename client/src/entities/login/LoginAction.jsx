import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { UserContext } from '../../index'
import LoginForm from './LoginForm'
import MainPage from 'pages/main/MainPage'
import { CircularProgress } from '@mui/material'

function LoginAction() {
  const { userStore } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth()
    }
  }, [])

  if (userStore.isLoading) {
    return <CircularProgress />
  }

  return !userStore.isAuth ? (
    <LoginForm />
  ) : !userStore.user.isActivated ? (
    <h2>Подтвердите аккаунт по почте</h2>
  ) : (
    <>
      <MainPage />
    </>
  )
}

export default observer(LoginAction)
