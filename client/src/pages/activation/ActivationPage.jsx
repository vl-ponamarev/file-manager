import { Typography, Card, Avatar, Flex } from 'antd';

import React from 'react';

const ActivationPage = () => {
  const { Text, Title } = Typography;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card style={{ width: 300 }}>
        <Flex gap="middle" vertical style={{ marginTop: 0 }}>
          <Title level={5}>
            <b>
              <Avatar size={25} style={{ backgroundColor: '#87d068', fontSize: 15 }}>
                I
              </Avatar>{' '}
              {''}
              Для активации аккаунта в Family File Store перейдите по ссылке в письме, отправленном
              на вашу электронную почту, указанную при регистрации.
            </b>
          </Title>
        </Flex>

        <Text type="secondary">Это вкладку можно закрыть.</Text>
      </Card>
    </div>
  );
};

export default ActivationPage;
