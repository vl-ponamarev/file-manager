import React from 'react'
import { Avatar, Layout, theme, Typography } from 'antd'
import DataMenu from 'entities/data-menu/DataMenu'
import iconImage from 'assets/favicon_io/favicon-32x32.png'
import Logout from 'features/logout/Logout'
import { observer } from 'mobx-react-lite'
import DataViewComponent from 'features/data-view-component/DataViewComponent'
import DataActionPanel from 'widgets/data-action-panel/DataActionPanel'
import DataViewPanel from 'widgets/data-view-panel/DataViewPanel'
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

  const [param, setParam] = React.useState(true)
  const [levelUp, setLevelUp] = React.useState(true)

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
          <DataActionPanel />
        </Header>
        <Layout
          style={{
            height: '100%',
          }}
        >
          <Sider
            width={400}
            style={{
              background: colorBgContainer,
              flex: '0 0 255px',
            }}
          >
            <DataMenu />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
              flex: 1,
            }}
          >
            <DataViewPanel
              param={param}
              setParam={setParam}
              levelUp={levelUp}
              setLevelUp={setLevelUp}
            />

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: '78vh',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <DataViewComponent
                param={param}
                levelUp={levelUp}
                setLevelUp={setLevelUp}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default observer(MainPage)
