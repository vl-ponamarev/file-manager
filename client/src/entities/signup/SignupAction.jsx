import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { UserContext } from '../../index'
import SignupForm from './SignupForm'
import MainPage from 'pages/main/MainPage'
import { CircularProgress } from '@mui/material'

function SignupAction() {
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
    <SignupForm />
  ) : !userStore.user.isActivated ? (
    <h2>Подтвердите аккаунт по почте</h2>
  ) : (
    <MainPage />
  )
}

export default observer(SignupAction)
