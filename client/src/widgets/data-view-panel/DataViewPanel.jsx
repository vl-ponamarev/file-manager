import React from 'react'
import { Breadcrumb, Button, Col, Row } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { DataViewButton } from 'shared/ui/button'

const DataViewPanel = ({ param, setParam, levelUp, setLevelUp }) => {
  return (
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
  )
}

export default DataViewPanel
