import React from 'react'
import { Breadcrumb, Button, Col, Row, Space } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { DataViewButton } from 'shared/ui/button'
import { observer } from 'mobx-react-lite'

const DataViewPanel = ({ param, setParam, levelUp, setLevelUp }) => {
  return (
    <Row justify="space-between" align="middle">
      <Space>
        <Button
          style={{
            margin: '16px 0',
            border: 'none',
          }}
          onClick={() => setLevelUp(!levelUp)}
        >
          <ArrowUpOutlined />
        </Button>
        <Breadcrumb
          style={{
            margin: '20px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>MainPage</Breadcrumb.Item>
        </Breadcrumb>
      </Space>
      <Space>
        <DataViewButton setParam={setParam} param={param} />
      </Space>
    </Row>
  )
}

export default observer(DataViewPanel)
