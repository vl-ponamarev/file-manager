import React, { useContext } from 'react'
import { UserContext } from '../../index'
import { observer } from 'mobx-react-lite';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function Logout() {
  const { userStore } = useContext(UserContext);

  const logoutHandler = () => {
    userStore.logout();
    window.location.replace('/login');
  };
  return (
    <Button
      style={{
        backgroundColor: '#1976d2',
        color: 'white',
        fontSize: 16,
      }}
      type="primary"
      icon={<LogoutOutlined />}
      onClick={() => logoutHandler()}
    >
      Logout
    </Button>
  );
}

export default observer(Logout)
