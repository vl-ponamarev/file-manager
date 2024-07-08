import LoginAction from 'entities/login/LoginAction'
import SignupForm from 'entities/signup/SignupForm'
import EditPost from 'features/post/editPost/EditPost'
import { UserContext } from 'index'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import MainPage from '../pages/main/MainPage'

const Router = observer(() => {
  const { userStore } = useContext(UserContext)

  const { isAuth, isActivated } = userStore
  console.log(userStore)
  console.log(userStore.user)
  console.log(isAuth)
  console.log(isActivated)

  return (
    <Routes>
      {!isAuth && (
        <>
          <Route path="/" element={<LoginAction />} />
          <Route path="/signup" element={<SignupForm />} />{' '}
        </>
      )}
      {isAuth && isActivated && (
        <Route path="/" element={<MainPage />}>
          <Route path="/posts/:id" element={<EditPost />} />
        </Route>
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
})

export default Router
