import React from 'react'
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Layout,
  Row,
  Space,
  theme,
  Typography,
} from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import DataMenu from 'entities/data-menu/DataMenu'
import iconImage from 'assets/favicon_io/favicon-32x32.png'
import Logout from 'entities/logout/Logout'
import UploadFiles from 'features/uploadFile/UploadFiles'
import CreateDirectory from 'features/create-directory/CreateDirectory'
import { observer } from 'mobx-react-lite'
import { DataViewButton } from 'shared/ui/button'
import DataViewComponent from 'features/data-view-component/DataViewComponent'
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
          <Space>
            <CreateDirectory />
            <UploadFiles />
          </Space>
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
            <Row>
              <Col span={1}>
                {' '}
                <Button
                  style={{
                    margin: '16px 0',
                    border: 'none',
                  }}
                  onClick={() => setLevelUp(!levelUp)}
                >
                  <ArrowUpOutlined />
                </Button>
              </Col>
              <Col span={7}>
                {' '}
                <Breadcrumb
                  style={{
                    margin: '20px 0',
                  }}
                >
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>MainPage</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                span={8}
                offset={8}
              >
                <DataViewButton setParam={setParam} param={param} />
              </Col>
            </Row>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: '78vh',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <DataViewComponent param={param} levelUp={levelUp} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default observer(MainPage)
