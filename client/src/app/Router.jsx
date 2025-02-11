import { UserContext } from 'index';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LoginAction, SignUpAction } from 'features';
import { ActivationPage, MainPage } from 'pages';
import Loader from 'shared/ui/loader/Loader';

const Router = observer(() => {
  const { userStore } = useContext(UserContext);
  const {
    isAuth,
    user: { isActivated },
    isLoading,
  } = userStore;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {!isAuth && (
        <>
          <Route path="/" element={<LoginAction />} />
          <Route path="/signup" element={<SignUpAction />} />
        </>
      )}
      {isAuth && !isActivated && <Route path="/" element={<ActivationPage />} />}
      {isAuth && isActivated && <Route path="/" element={<MainPage />} />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
});

export default Router;
