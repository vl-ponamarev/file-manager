import LoginAction from 'entities/login/LoginAction'
import SignupForm from 'entities/signup/SignupForm'
import EditPost from 'features/post/editPost/EditPost'
import { Context, UserContext } from 'index'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './main/MainPage'

export const Routing = () => {
  const { userStore } = useContext(UserContext)

  const isAuth = userStore.isAuth
  console.log(userStore)
  console.log(userStore.user)
  console.log(isAuth)

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuth ? <Navigate to="/login" /> : <Navigate to="/main" />}
      />

      <Route
        path="/main"
        element={isAuth ? <MainPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuth ? <LoginAction /> : <Navigate to="/main" />}
      />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/posts/:id" element={<EditPost />} />
      <Route path="*" element={<LoginAction />} />
    </Routes>
  )
}

// export const Router = () => {
//   const authed = authStore((s) => s.user.authed)
//   const ChartComponent = <MemoChartComponent />
//   const TrainCard = <MemoTrainCard />
//   const DateTimeComponent = <MemoDateTimeComponent />

//   return (
//     <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
//       <Routes>
//         {!authed && <Route path="/" element={<Auth />} />}
//         {authed && (
//           <Route path="/" element={<MainPage />}>
//             <Route
//               index
//               element={
//                 <JoinedPage
//                   MemoMapComponent={<MemoMapComponent />}
//                   MemoChartComponent={ChartComponent}
//                   MemoTrainCard={TrainCard}
//                   MemoDateTimeComponent={DateTimeComponent}
//                 />
//               }
//             />
//           </Route>
//         )}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </div>
//   )
// }
