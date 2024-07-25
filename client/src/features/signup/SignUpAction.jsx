import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { UserContext } from '../../index'
import SignUpForm from './SignUpForm'
import MainPage from 'pages/main/MainPage'
import { CircularProgress } from '@mui/material'

function SignUpAction() {
  const { userStore } = useContext(UserContext)

  const {
    isAuth,
    user: { isActivated },
  } = userStore

  useEffect(() => {
    console.log(isActivated)
  }, [isActivated])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth()
    }
  }, [])

  if (userStore.isLoading) {
    return <CircularProgress />
  }

  console.log(isAuth)
  console.log(isActivated)

  return !isAuth ? (
    <SignUpForm />
  ) : !isActivated ? (
    <h2>Подтвердите аккаунт по почте</h2>
  ) : (
    <MainPage />
  )
}

export default observer(SignUpAction)
