import LoginAction from 'features/login/LoginAction'
import EditPost from 'features/post/editPost/EditPost'
import { UserContext } from 'index'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import MainPage from '../pages/main/MainPage'
import SignUpAction from 'features/signup/SignUpAction'
import ActivationPage from 'pages/activation/ActivationPage'

const Router = observer(() => {
  const { userStore } = useContext(UserContext)

  const {
    isAuth,
    user: { isActivated },
  } = userStore
  console.log(userStore)
  console.log(userStore.user)
  console.log(isAuth)
  console.log(isActivated)

  return (
    <Routes>
      {!isAuth && (
        <>
          <Route path="/" element={<LoginAction />} />
          <Route path="/signup" element={<SignUpAction />} />{' '}
        </>
      )}
      {isAuth && !isActivated && (
        <Route path="/" element={<ActivationPage />} />
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
