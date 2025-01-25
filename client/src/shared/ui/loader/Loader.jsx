import { Spin } from 'antd';
import React from 'react';

const Loader = () => {
  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;
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
};

export default Loader;
