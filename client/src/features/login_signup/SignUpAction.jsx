import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../../index';
import { MainPage } from 'pages';
import EnterForm from './ui/EnterForm';
import { Spin } from 'antd';

function SignUpAction() {
  const { userStore } = useContext(UserContext);

  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  const {
    isAuth,
    user: { isActivated },
  } = userStore;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
  }, []);

  if (userStore.isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin tip="Loading" size="large">
          {content}
        </Spin>{' '}
      </div>
    );
  }

  return !isAuth ? (
    <EnterForm action="signup" />
  ) : !isActivated ? (
    <h2>Подтвердите аккаунт по почте</h2>
  ) : (
    <MainPage />
  );
}

export default observer(SignUpAction);
