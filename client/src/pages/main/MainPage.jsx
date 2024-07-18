import React from 'react'
import { Avatar, Breadcrumb, Layout, Space, theme, Typography } from 'antd'
import DataMenu from 'entities/data-menu/DataMenu'
import DataTable from 'entities/data-table/DataTable'
import iconImage from 'assets/favicon_io/favicon-32x32.png'
import Logout from 'entities/logout/Logout'
import UploadFiles from 'features/uploadFile/UploadFiles'
import CreateDirectory from 'features/create-directory/CreateDirectory'
const { Header, Content, Sider } = Layout
const { Text } = Typography

const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Monospace',
    fontSize: 30,
    marginLeft: 10,
  }

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
          background: '#1976d2',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="icon" src={iconImage} size={40} />
          <Text style={linkStyle}> Family File Store</Text>
        </div>
        <Logout />
      </Header>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
            background: '#feffff',
          }}
        >
          <Space>
            <CreateDirectory />
            <UploadFiles />
          </Space>
        </Header>
        <Layout>
          <Sider
            width={400}
            style={{
              background: colorBgContainer,
            }}
          >
            <DataMenu />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>MainPage</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <DataTable />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default MainPage
